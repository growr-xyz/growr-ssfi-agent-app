import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import { useMutation, gql } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import { setGoal, setPondAddress } from "../../../redux/user";
import BaseContentLayout from "../../../components/BaseContentLayout/BaseContentLayout";
import Input from "../../Input/Input";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../../utils/connectors";
import {
  findBestOffer,
  // verifyCredentials,
  // registerVerification,
  // borrow,
  // repay,
  // fetchRepaymentHistory,
  // getLoanDetails,
} from "../../../utils/contractHelper.js";
import styles from "./GoalStep.module.css";
import useDataVault from "hooks/useDataVault";

import { dataVaultKeys } from "../../../config/getConfig";

const { ethers, BigNumber } = require("ethers");

// Decimals from WEI to 10 ** -8
export const etherDecimals = BigNumber.from(10).pow(BigNumber.from(10));

function GoalStep({ onNext }) {
  const userState = useSelector((state) => state.user);
  const dataVault = useDataVault();

  const { activate, library } = useWeb3React();

  useEffect(() => {
    try {
      activate(injected, undefined, true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  // useEffect(() => {
  // 	const init = async () => {
  // 		try {
  // 			const offer = await findBestOffer(library, account, {
  // 				amount: "10",
  // 				duration: 5,
  // 				credentials: { names: ["citizenship"], contents: ["SV"] },
  // 			});
  // 			console.log('Offer found ', offer);
  //       if (offer) {
  //         // const BigNumber = require('bignumber.js');
  //         // let num=BigNumber.from(offer.details.amount); //.mul(etherDecimals);;
  //         // let denom = BigNumber.from(10).pow(16);
  //         // let ans = num.div(denom).toNumber();
  //         let num = ethers.utils.formatEther(offer.details.amount);
  //         // console.log(ans.toString());

  //         // console.log(ethers.utils.formatUnits(offer.details.amount, 2));
  //         // console.log(ethers.utils.formatUnits(offer.details.installmentAmount, 2));
  //       }
  // 			// const verifiedCredentialNames = await verifyCredentials(library, account, {
  // 			// 	pondAddress: offer.pondAddress,
  // 			// 	credentials: { citizenship: "SV" },
  // 			// });
  // 			// if (!verifiedCredentialNames) throw new Error("Not eligible");
  // 			// await registerVerification(library, account, {
  // 			// 	borrower: account,
  // 			// 	pondAddress: offer.pondAddress,
  // 			// });
  // 			// console.log(`Borrower is verified`);
  // 			// await borrow(library, account, {
  // 			// 	amount: offer.details.amount,
  // 			// 	duration: offer.details.duration,
  // 			// 	pondAddress: offer.pondAddress,
  // 			// });
  // 			// console.log(`Borrower got the money`);
  // 			// const loanDetailsBefore = await getLoanDetails(library, account, { pondAddress: offer.pondAddress });
  // 			// console.log("Next installment", loanDetailsBefore._receipt.nextInstallment.total.toString());
  // 			// await repay(library, account, { pondAddress: offer.pondAddress, amount: "50" });
  // 			// console.log(`Repaid ${50}`);
  // 			// const loanDetailsAfter = await getLoanDetails(library, account, { pondAddress: offer.pondAddress });
  // 			// console.log("Next installment", loanDetailsAfter._receipt.nextInstallment.total.toString());
  // 			// const history = await fetchRepaymentHistory(library, account, {
  // 			// 	pondAddress: offer.pondAddress,
  // 			// });
  // 			// console.log(`Repayment history`, history);
  // 		} catch (error) {
  // 			console.log(error.message);
  // 		}
  // 	};

  // 	init();
  // }, [library, account]);

  const goal = useSelector((state) => state.user?.goals[0]);
  const dispatch = useDispatch();

  if (!goal.goalId) dispatch(setGoal({ ...goal, goalId: uuidv4() }));

  const t = useTranslations("onboarding");

  const inputFields = [
    {
      type: "text",
      name: "goalType",
      placeholder: "page4.goal_type",
    },
    {
      name: "amountSaved",
      placeholder: "page4.amount_saved",
    },
    {
      name: "amountNeeded",
      placeholder: "page4.amount_needed",
    },
    {
      name: "loanDuration",
      placeholder: "page4.loan_duration",
    },
  ];

  // const UPDATE_USER_GOAL = gql`
  //   mutation updateGoal{
  //     updateGoal(goalData:{
  //       name:"${goal.goalType}",
  //       duration:"${goal.loanDuration}",
  //       availableAmount:"${goal.amountSaved}",
  //       amountToBorrow:"${goal.amountNeeded}"
  //     }, userId:"${userId}"){
  //       _id,
  //       name,
  //       duration,
  //       availableAmount,
  //       amountToBorrow
  //     }
  //   }
  // `

  // const [updateUserGoal] = useMutation(UPDATE_USER_GOAL)

  const updateInput = (e) => {
    dispatch(
      setGoal({
        ...goal,
        [e.target.name]: e.target.value,
      })
    );
  };

  const onFormSubmit = async () => {
    await dataVault.create({
      key: dataVaultKeys.onboarding,
      content: JSON.stringify(userState),
    });

    onNext();
    // try {
    //   const offer = await findBestOffer(library, walletId, {
    //     amount: "10", // TODO: From input
    //     duration: 5, // TODO: From input
    //     credentials: { names: ["citizenship"], contents: ["SV"] },
    //   });
    //   console.log('Offer found', offer);
    //   if (offer) {
    //     // const BigNumber = require('bignumber.js');
    //     dispatch(setPondAddress(goal.goalId, offer.pondAddress));
    //     // TODO: Set loan details
    //     let num=BigNumber.from(offer.details.amount).mul(etherDecimals);
    //     // let ans = num.dividedBy(denom).toNumber();
    //     console.log(num.toString());
    //     onNext();
    //     // console.log(ethers.utils.formatUnits(offer.details.amount, 2));
    //     // console.log(ethers.utils.formatUnits(offer.details.installmentAmount, 2));
    //   }
    // } catch (error) {
    //   console.log(error.message);
    // }
    // TODO: Get offers from pond factory: list of VCs => provide details => OK/NOK
    // dispatch(setGoal(goals));
    // updateUserGoal()
    //   .then(res => {
    //     res.data.updateGoal._id && setGoalId(res.data.updateGoal._id)
    //     onNext()
    // })
    // .catch(err => err)
  };

  return (
    <BaseContentLayout
      {...{
        submitButtonProps: {
          label: t("submitBtn"),
          onClick: onFormSubmit,
          disabled:
            goal.goalType === "" ||
            goal.amountSaved < 1 ||
            goal.amountNeeded < 1 ||
            goal.loanDuration < 1,
        },
      }}
    >
      <div className={styles.wrapper}>
        <h1>{t("page4.title")}</h1>

        <div className={styles.formwrapper}>
          {inputFields.map((f, i) => (
            <Input
              key={i}
              name={f.name}
              type={f.type || "number"}
              placeholder={t(f.placeholder)}
              onChange={updateInput}
            />
          ))}
        </div>
      </div>
    </BaseContentLayout>
  );
}

// const mapStateToProps = function(state) {
//   return {
//     userId: state.user.userId
//   }
// }

// const mapDispatchToProps = {
//   setGoalId
// }

// export default connect(mapStateToProps, mapDispatchToProps)(GoalStep)
export default GoalStep;
