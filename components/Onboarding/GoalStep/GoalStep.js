import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import { v4 as uuidv4 } from "uuid";
import { setGoal, setOffer } from "../../../redux/user";
import BaseContentLayout from "../../../components/BaseContentLayout/BaseContentLayout";
import Input from "../../Input/Input";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../../utils/connectors";
import { findBestOffer } from "../../../utils/contractHelper.js";
import styles from "./GoalStep.module.css";
import useDataVault from "hooks/useDataVault";
import { dataVaultKeys } from "../../../config/getConfig";
const { ethers } = require("ethers");

function GoalStep({ onNext, isLoading, setIsLoading }) {
  const user = useSelector((state) => state.user);
  const goal = useSelector((state) => state.user.goals[0]);
  const offer = useSelector((state) => state.user.goals[0].offer);
  const bankCredentials = useSelector((state) => state.user.bankCredentials);
  const dataVault = useDataVault();
  const dispatch = useDispatch();
  const { activate, library } = useWeb3React();

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

  useEffect(() => {
    try {
      activate(injected, undefined, true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (offer.pondAddress) {
      (async () => {
        try {
          await dataVault.create({
            key: dataVaultKeys.onboarding,
            content: JSON.stringify(user),
          });
          onNext();
        } catch (err) {
          console.log("dataVault create err: ", err);
          onNext();
        }
      })();
    }
  }, [offer]);

  const updateInput = (e) => {
    dispatch(
      setGoal({
        ...goal,
        [e.target.name]: e.target.value,
      })
    );
  };

  const onFormSubmit = async () => {
    try {
      // Get credentials, TODO: Handle composite VCs (just one item per VC currently supported by the line below)
      // const myCredentials = bankCredentials.map(credential => Object.keys(credential.vc.credentialSubject)[0]);
      setIsLoading(true);
      const myCredentials = bankCredentials.reduce(
        (prev, item) => ({
          ...prev,
          [Object.keys(item.vc.credentialSubject)[0]]: Object.values(
            item.vc.credentialSubject
          )[0],
        }),
        {}
      );
      console.log("myCredentials", myCredentials);
      // Find the best offer from the Pond factory contract
      const pondOffer = await findBestOffer(library, user.walletId, {
        amount: goal.amountNeeded,
        duration: goal.loanDuration,
        credentials: myCredentials,
      });
      console.log("Offer found?", pondOffer);
      if (pondOffer) {
        const formattedOffer = {
          found: true,
          pondAddress: pondOffer.pondAddress,
          amount: ethers.utils.formatUnits(pondOffer.details.amount),
          annualInterestRate:
            Number(pondOffer.details.annualInterestRate) / 100,
          approved: pondOffer.details.approved,
          cashBackRate: Number(pondOffer.details.cashBackRate) / 100,
          disbursmentFee: Number(pondOffer.details.disbursmentFee),
          duration: Number(pondOffer.details.duration),
          installmentAmount: ethers.utils.formatUnits(
            pondOffer.details.installmentAmount
          ),
          totalAmount: ethers.utils.formatUnits(pondOffer.details.totalAmount),
          totalInterest: ethers.utils.formatUnits(
            pondOffer.details.totalInterest
          ),
        };
        dispatch(setOffer(goal.goalId, formattedOffer));
      } else {
        dispatch(setOffer(goal.goalId, { found: false }));
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
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
              value={goal[f.name]}
              placeholder={t(f.placeholder)}
              onChange={updateInput}
            />
          ))}
        </div>

        {offer?.found === false ? (
          <h4 style={{ color: "#B14365" }}>
            No offer was found, please try again
          </h4>
        ) : (
          <></>
        )}
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
