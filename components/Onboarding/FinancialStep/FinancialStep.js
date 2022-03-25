import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import { useMutation, gql } from "@apollo/client";
import { setUserId, setFinances } from "../../../redux/user";
import BaseContentLayout from "../../../components/BaseContentLayout/BaseContentLayout";
import Input from "../../Input/Input";
import styles from "./FinancialStep.module.css";
import { useWeb3React } from "@web3-react/core";
import {
	checkBalanceXUSD,
	createPond,
	findBestOffer,
	verifyCredentials,
	registerVerification,
	borrow,
	fetchEvents,
} from "../../../utils/contractHelper.js";

function FinancialStep({ onNext }) {
	const { library, account } = useWeb3React();

	useEffect(() => {
		const init = async () => {
			try {
				// await createPond(library, account);
				await fetchEvents(library, account);
				return;
				const offer = await findBestOffer(library, account, {
					amount: "10",
					duration: 5,
					credentials: { names: ["citizenship"], contents: ["SV"] },
				});

				// ponds ['0x6882914bB5904De6b50ba897F4B3a7A4F627435d', '0xab853DA027775dF11c30cb5b7757B8B703E75c65']
				const verifiedCredentialNames = await verifyCredentials(library, account, {
					pondAddress: offer.pondAddress,
					credentials: { citizenship: "SV" },
				});

				if (!verifiedCredentialNames) throw new Error("Not eligible");

				await registerVerification(library, account, {
					borrower: account,
					pondAddress: offer.pondAddress,
				});

				await borrow(library, account, {
					amount: offer.details.amount,
					duration: offer.details.duration,
					pondAddress: offer.pondAddress,
				});
			} catch (error) {
				console.log(error.message);
			}
		};

		init();
	}, [library, account]);
	// const walletId = useSelector((state) => state.user.walletId);
	// const userId = useSelector((state) => state.user.termsAccepted);
	const finances = useSelector((state) => state.user.finances);
	const dispatch = useDispatch();

	const t = useTranslations("onboarding");

	// const [finances, setFinances] = useState({
	//     income: 0,
	//     other: 0,
	//     unofficial: 0,
	//     expenses: 0,
	//     dependants: 0
	// })

	const updateInput = (e) => {
		dispatch(
			setFinances({
				...finances,
				[e.target.name]: e.target.value,
			})
		);
	};

	const formInputs = [
		{
			name: "income",
			placeholder: "page3.official_income",
		},
		{
			name: "other",
			placeholder: "page3.other_income",
		},
		{
			name: "unofficial",
			placeholder: "page3.unofficial_income",
		},
		{
			name: "expenses",
			placeholder: "page3.expenses",
		},
		{
			name: "dependants",
			placeholder: "page3.dependants",
		},
	];

	// const UPDATE_USER_FINANCES = gql`
	//   mutation updateUser{
	//     updateUser(
	//       userData:{
	//         officialPersonalIncome:"${finances.income}",
	//         officialHouseholdIncome:"${finances.other}",
	//         unofficialHouseholdIncome:"${finances.unofficial}",
	//         householdExpenses:"${finances.expenses}",
	//         dependants:"${finances.dependants}"
	//       }, address:"${walletId}"){
	//       _id,
	//       officialPersonalIncome,
	//       officialHouseholdIncome,
	//       unofficialHouseholdIncome,
	//       householdExpenses,
	//       dependants
	//     }
	//   }
	// `
	// const [updateUserFinances, { data, loading, error }] = useMutation(UPDATE_USER_FINANCES)

	const onFormSubmit = () => {
		onNext();
		// updateUserFinances()
		//   .then(res => {
		//     res.data.updateUser._id && setUserId(res.data.updateUser._id)
		//     onNext()
		//   })
		//   .catch(err => err)
	};

	return (
		<BaseContentLayout
			{...{
				submitButtonProps: {
					label: t("submitBtn"),
					onClick: onFormSubmit,
					disabled:
						finances?.income < 1 ||
						finances?.other < 1 ||
						finances?.unofficial < 1 ||
						finances?.expenses < 1 ||
						finances?.dependants < 1,
				},
			}}
		>
			<div className={styles.wrapper}>
				<h1>{t("page3.title")}</h1>

				<div className={styles.formwrapper}>
					{formInputs.map((f, i) => (
						<Input
							key={i}
							name={f.name}
							type="number"
							placeholder={t(f.placeholder)}
							onChange={updateInput}
						/>
					))}
				</div>
			</div>
		</BaseContentLayout>
	);
}

export default FinancialStep;
