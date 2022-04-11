import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import { setFinances } from "../../../redux/user";
import BaseContentLayout from "../../../components/BaseContentLayout/BaseContentLayout";
import Input from "../../Input/Input";
import styles from "./FinancialStep.module.css";

function FinancialStep({ onNext }) {
	const finances = useSelector((state) => state.user.finances);
	const dispatch = useDispatch();

	const t = useTranslations("onboarding");

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

	const onFormSubmit = () => {
		onNext();
	};

	return (
		<BaseContentLayout
			{...{
				submitButtonProps: {
					label: t("submitBtn"),
					onClick: onFormSubmit,
					disabled:
						finances?.income < 1 ||
						finances?.other < 0 ||
						finances?.unofficial < 0 ||
						finances?.expenses < 1 ||
						finances?.dependants < 0,
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
							value={finances[f.name]}
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
