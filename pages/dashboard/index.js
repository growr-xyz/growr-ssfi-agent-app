import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import { useTranslations } from 'next-intl';
import SimpleConnector from '../../components/WalletConnector/SimpleConnector';
import { Header, Page, Widget, Section, Goal } from '../../components';
import HelmetIcon from '../../components/Icons/Helmet';
import Link from 'next/link';
import { Bitcoin, Budget } from '../../components/Quests';
import { getBalance } from '../../utils/contractHelper';
import styles from './Dashboard.module.css';

function Dashboard() {
  const walletId = useSelector((state) => state.user.walletId);
  const goals = useSelector((state) => state.user.goals);
  const { library } = useWeb3React();
  const dispatch = useDispatch();
  const [balance, setBalance] = useState();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations("dashboard");

  useEffect(() => {
    // Balance fetching function
    const fetchBalace = async () => {
      if (library !== undefined) {
        let balance_ = await getBalance(library, walletId);
        setBalance(balance_);
      }
    }

    fetchBalace();
    console.log('balance', balance);
  }, [library, walletId])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  if (!library) return <SimpleConnector />;

  const goToDashboard = () => {
    router.push('/dashboard');
  }

  if (!walletId) {
    router.push('/');
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
          <Link href="/dashboard">
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
          balance: "$" + balance, // TBD - wallet balance here
          currency: "US Dollar (xUSD)",
        }}
      />
      <Section label={t('goals.title')}>
        {goals?.map((goal) => (
          <div
            key={goal.goalId}
            onClick={() => {
              router.push(`/goal?goalId=${goal.goalId}`);
            }}
            style={{ display: "inline-block" }}
          >
            <Goal {...{...goal, details: `${goal.isAchieved ? t("goals.status.funded") : t("goals.status.progress")}, $${Math.round(goal.loan.totalToRepay)} ${t("goals.status.due")}`, progress: balance/(parseFloat(goal.amountNeeded) + parseFloat(goal.amountSaved)), value: balance }} />
          </div>
        ))}
      </Section>
      <Section label={t('quests.title')}>
        <Budget />
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