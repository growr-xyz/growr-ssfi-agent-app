import router, { useRouter } from "next/router";
import { useWeb3React } from '@web3-react/core';
// import { useQuery, gql } from "@apollo/client";
import { useSelector, useDispatch } from 'react-redux'
import Header from "./components/Header/Header";
import Loan from "./components/Loan/Loan";
import Transactions from "./components/Transactions/Transactions";
import { ScoreBar, Button } from "../../components";
import { useTranslations } from "next-intl";
import Gear from "../../components/Icons/Gear";
import { repay } from '../../utils/contractHelper';

import styles from "./Goal.module.css";

const Goal = () => {
  const router = useRouter();
  const { library } = useWeb3React();
  // console.log("router:", router);
  const t = useTranslations("dashboard");
  const { goalId } = router.query;

  const walletId = useSelector((state) => state.user.walletId);
  const balance = useSelector((state) => state.user.balance);
  const goals = useSelector((state) => state.user.goals);
  const goal = goals?.filter(goal => goal.goalId === goalId)[0];
  
  console.log('Goal:', goal);
  const loan = goal?.loan;
  const dispatch = useDispatch();
  
  // if (loading || error || !data) return null;

  // const { goal } = data;
  // const { loan } = goal;

  // TBD - get wallet balance
  // const balance = 1200.0;

  const onBackPress = () => {
    router.push("/dashboard");
  };

  const repayLoan = async() => {
    await repay(library, walletId, { pondAddress: loan.pondAddress, amount: loan.nextInstallmentAmount.toString() });
  }

  return (
    <div className={styles.container}>
      <Header onBackPress={onBackPress} />
      <div className={styles.goal}>
        <div className={styles.scoreBar}>
          <ScoreBar
            progressIndex={
              balance / (parseFloat(goal?.amountNeeded) + parseFloat(goal?.amountSaved))
            }
            value={parseFloat(balance).toFixed(0)}
            size="big"
          />
        </div>
        <h1>{goal?.goalType}</h1>
        <h4>
          {t("goals.amount.progress")} {parseFloat(balance).toFixed(0)} {t("goals.amount.of")}
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
        {loan ? <Loan repay={repayLoan} {...loan} /> : null}
        {loan ? <Transactions {...loan} /> : null}
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