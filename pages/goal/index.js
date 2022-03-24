import router, { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import { useSelector, useDispatch } from 'react-redux'
import Header from "./components/Header/Header";
import Loan from "./components/Loan/Loan";
import Transactions from "./components/Transactions/Transactions";
import { ScoreBar, Button } from "../../components";
import { useTranslations } from "next-intl";
import Gear from "../../components/Icons/Gear";

import styles from "./Goal.module.css";

// const goal = {
//   id: 1,
//   name: "Car purchase",
//   duration: "12M",
//   availableAmount: "1000.00",
//   amountToBorrow: "1500.00",
//   isAchieved: false,
//   loan: {
//     amount: "1200.00",
//     apr: "12.34%",
//     duration: "9",
//     instalment: "12.22%",
//     nextInstalmentDue: "116.96",
//     lastInstalmentDue: "1670630400000",
//     totalToRepay: "1200.00", //"1334.22"
//     totalInterest: "134.22",
//   },
// };

const Goal = () => {
  const router = useRouter();
  console.log("router:", router);
  const t = useTranslations("dashboard");
  const { goalId } = router.query;

  // const walletId = useSelector((state) => state.user.walletId);
  const goals = useSelector((state) => state.user.goals);
  const goal = goals?.filter(goal => goal.goalId === goalId)[0];
  console.log('Goal:', goal);
  const loan = goal?.loan;
  const dispatch = useDispatch();
  
  // const GET_GOAL = gql`
  // query goal {
  //   goal(id:"${goalId}"){
  //         _id,
  //         name,
  //         duration,
  //         isAchieved,
  //         amountToBorrow,
  //         availableAmount
  //         loan{
  //             _id,
  //           amount,
  //           apr,
  //           duration,
  //           instalment,
  //           nextInstalmentDue,
  //           lastInstalmentDue,
  //           totalToRepay,
  //           totalInterest
  //           }
  //       }
  // }
  // `;

  // const { data, loading, error } = useQuery(GET_GOAL);

  // if (loading || error || !data) return null;

  // const { goal } = data;
  // const { loan } = goal;

  // TBD - get wallet balance
  const balance = 1200.0;

  const onBackPress = () => {
    router.push("/dashboard");
  };

  return (
    <div className={styles.container}>
      <Header onBackPress={onBackPress} />
      <div className={styles.goal}>
        <div className={styles.scoreBar}>
          <ScoreBar
            progressIndex={
              balance /
              (parseFloat(goal?.amountNeeded) +
                parseFloat(goal?.amountSaved))
            }
            value={balance}
            size="big"
          />
        </div>
        <h1>{goal?.goalType}</h1>
        <h4>
          {t("goals.amount.progress")} {balance} {t("goals.amount.of")}
          {parseFloat(goal?.amountNeeded) + parseFloat(goal?.amountSaved)}
        </h4>
        <div className={styles.buttonGroup}>
          <Button label={t("goals.amount.add")} style={styles.button} />
          <Button
            label={t("goals.amount.pay")}
            style={styles.button}
            onClick={() => {
              router.push(`/payment?goalId=${goalId}`);
            }}
          />
          <Button label={<Gear />} style={styles.button} />
        </div>
      </div>
      <div className={styles.more}>
        {loan ? <Loan {...loan} /> : null}
        <Transactions />
      </div>
    </div>
  );
};

export default Goal;

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: {
        dashboard: require(`../../locales/${locale}/dashboard.json`),
      },
    },
  };
} // generates an error: Error: getStaticPaths is required for dynamic SSG pages and is missing for '/goal/[goalId]'.
