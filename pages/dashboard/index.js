import Image from "next/image";
import { useEffect, useState } from "react";
// import { useQuery, gql } from '@apollo/client';
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import { useTranslations } from "next-intl";
import SimpleConnector from "../../components/WalletConnector/SimpleConnector";
import { Header, Page, Widget, Section, Goal } from "../../components";
import HelmetIcon from "../../components/Icons/Helmet";
import Link from "next/link";
import { Bitcoin, Budget, FinHealth } from "../../components/Quests";
import {
  getBalance,
  getLoanDetails,
  fetchRepaymentHistory,
} from "../../utils/contractHelper";
import styles from "./Dashboard.module.css";
import { setBalance, setLoan } from "../../redux/user";
import { execute } from "graphql";
// import { isCommunityResourcable } from '@ethersproject/providers';
const { ethers } = require("ethers");

function Dashboard() {
  const walletId = useSelector((state) => state.user.walletId);
  const balance = useSelector((state) => state.user.balance);
  const goals = useSelector((state) => state.user.goals);
  const { library } = useWeb3React();
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations("dashboard");

  useEffect(() => {
    // Balance fetching function
    const fetchBalace = async () => {
      if (library !== undefined) {
        let balance_ = await getBalance(library, walletId);
        console.log("balance ===>", balance_);
        dispatch(setBalance(balance_));

        const pondAddress = goals[0].offer.pondAddress;

        const loanDetailsRaw = await getLoanDetails(library, walletId, {
          pondAddress,
        });
        console.log("loanDetailsRaw", loanDetailsRaw);

        let history = [];
        // try {
        //   history = await fetchRepaymentHistory(library, walletId, { pondAddress });
        //   console.log('Repayment history', history);
        // } catch {
        //   e => console.error(e);
        // }

        const loanDetails = {
          pondAddress: pondAddress,
          amount: ethers.utils.formatUnits(loanDetailsRaw._params.amount),
          annualInterestRate:
            Number(loanDetailsRaw._params.annualInterestRate) / 100,
          cashBackRate: Number(loanDetailsRaw._params.cashBackRate) / 100,
          disbursmentFee: Number(loanDetailsRaw._params.disbursmentFee),
          duration: Number(loanDetailsRaw._params.duration),
          token: loanDetailsRaw._params.token,
          totalAmount: ethers.utils.formatUnits(
            loanDetailsRaw._receipt.totalAmount
          ),
          totalInterest: ethers.utils.formatUnits(
            loanDetailsRaw._receipt.totalInterest
          ),
          repaidAmount: ethers.utils.formatUnits(
            loanDetailsRaw._receipt.repaidTotalAmount
          ),
          repaidInterest: ethers.utils.formatUnits(
            loanDetailsRaw._receipt.repaidInterestAmount
          ),
          installmentAmount: ethers.utils.formatUnits(
            loanDetailsRaw._receipt.installmentAmount
          ),
          nextInstallmentAmount: ethers.utils.formatUnits(
            loanDetailsRaw._receipt.nextInstallment.total
          ),
          nextInstallmentPrincipal: ethers.utils.formatUnits(
            loanDetailsRaw._receipt.nextInstallment.principal
          ),
          nextInstallmentInterest: ethers.utils.formatUnits(
            loanDetailsRaw._receipt.nextInstallment.interest
          ),
          // Timestamp in smart contract is in UNIX format, multiply by 1000
          nextInstallmentTimestamp: new Date(
            Number(loanDetailsRaw._receipt.nextInstallment.timestamp) * 1000
          ),
          repaymentHistory: history?.map((transaction) => ({
            timestamp: new Date(Number(transaction.timestamp) * 1000),
            amount: ethers.utils.formatUnits(transaction.amount),
          })),
        };
        console.log("loanDetails", loanDetails);
        dispatch(setLoan(goals[0].goalId, loanDetails));
      }
    };

    fetchBalace();
  }, [library, walletId]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  if (!library) return <SimpleConnector />;

  const goToDashboard = () => {
    router.push("/dashboard");
  };

  if (!walletId) {
    router.push("/");
  }

  // const printBalance = value => console.log('Wallet balance:', value);

  // TBD - get wallet balance
  // const balance = 1200.0;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { data, loading, error } = useQuery(GET_WALLET);

  // if (loading || error || !data) return null;

  // const { goals } = data.wallet.user;

  // TODO: add proper links
  const renderHeader = () => {
    return (
      <Header>
        <div className={styles.navigation}>
          {/* <Image
            src="/congrats.svg"
            height={28}
            width={28}
            alt="Helmet"
            onClick={goToDashboard}
          /> */}
          <Link href="/profile">
            <a className={styles.link}>
              <HelmetIcon />
            </a>
          </Link>
        </div>
      </Header>
    );
  };

  return (
    <Page
      {...{
        renderHeader,
        styles: {
          wrap: styles.pageWrap,
        },
      }}
    >
      <Widget
        {...{
          balance: "$" + parseFloat(balance).toFixed(0), // This is the xUSD balance from the wallet
          currency: "US Dollar (xUSD)",
        }}
      />
      <Section label={t("goals.title")}>
        {goals?.map((goal) => (
          <div
            key={goal.goalId}
            onClick={() => {
              router.push(`/goal?goalId=${goal.goalId}`);
            }}
            style={{ display: "inline-block" }}
          >
            <Goal
              {...{
                ...goal,
                details: `${
                  goal.isAchieved
                    ? t("goals.status.funded")
                    : t("goals.status.progress")
                }, $${Math.round(
                  goal.loan.totalAmount -
                    goal.loan.totalInterest -
                    (goal.loan.repaidAmount - goal.loan.repaidInterest)
                )} ${t("goals.status.due")}`,
                progress:
                  balance /
                  // The total goal amount is amountNeeded (from the loan) + amountSaved
                  (parseFloat(goal.amountNeeded) +
                    parseFloat(goal.amountSaved)),
                value: parseFloat(balance).toFixed(0),
              }}
            />
          </div>
        ))}
      </Section>
      <Section label={t("quests.title")}>
        <FinHealth />
        {/* <Budget /> */}
        <Bitcoin />
      </Section>
    </Page>
  );
}

// export default connect(mapStateToProps)(Dashboard);
export default Dashboard;

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: {
        dashboard: require(`../../locales/${locale}/dashboard.json`),
      },
    },
  };
}
