import Link from "next/link"
import Image from 'next/image'
import { useEffect } from 'react'
import { useQuery, gql } from "@apollo/client"
import { connect } from 'react-redux'
import { useRouter } from "next/router"
import { useTranslations } from "next-intl"
import SimpleConnector from "../../components/WalletConnector/SimpleConnector"
import { Header, Page, Widget, Section, Goal } from '../../components'
import HelmetIcon from "../../components/Icons/Helmet"
import { Bitcoin, Budget } from "../../components/Quests"
import { getWalletBalance } from '../../utils/swap'
import { setWalletBalance } from '../../redux/user'
import styles from "./Dashbaord.module.css"


function Dashboard ({ wallet, balance, setBalance }) {
  if (!wallet) return <SimpleConnector />;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations("dashboard");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  if (!wallet) return <SimpleConnector />;

  const GET_WALLET = gql`
    query wallet {
      wallet(address:"${wallet}"){
        address, 
        vendor, 
        network
        user{
          _id,
          fullName,
          education, 
            dependants, 
          dateOfBirth, 
          householdExpenses,
          officialHouseholdIncome,
          unofficialHouseholdIncome,
          location,
          maritalStatus,
          score,
          goals{
            _id,
            name,
            duration,
            isAchieved,
            amountToBorrow,
            availableAmount
            loan{
              _id,
              amount,
              apr,
              duration,
              instalment,
              nextInstalmentDue,
              lastInstalmentDue,
              totalToRepay,
              totalInterest
            }
          }
        }
      }
    }
  `

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getWalletBalance(wallet, printBalance)
  })

  const printBalance = value => {
    setBalance(value)
  }

  const goToDashboard = () => {
    router.push('/dashboard');
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, loading, error } = useQuery(GET_WALLET);

  if (loading || error || !data) return null;

  const { goals } = data.wallet.user;

  // TODO: add proper links
  const renderHeader = () => {
    return (
      <Header>
        <div className={styles.navigation}>
          <Image
            src="/congrats.svg"
            height={28}
            width={28}
            alt="Helmet"
            onClick={goToDashboard}
          />
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
          balance: `$ ${balance * 50000}`,
          currency: `${balance} RBTC`,
        }}
      />
      <Section label={t('goals.title')}>
        {goals?.map((goal) => (
          <div
            key={goal.name}
            onClick={() => {
              router.push(`/goal?goalId=${goal._id}`);
            }}
            style={{ display: "inline-block" }}
          >
            <Goal {...{ 
              ...goal, 
              details: `${goal.isAchieved?t("goals.status.funded"):t("goals.status.progress")}, $${Math.round(goal.loan.totalToRepay)} ${t("goals.status.due")}`, 
              progress: (balance * 50000) / (parseFloat(goal.amountToBorrow) + parseFloat(goal.availableAmount)), 
              value: (balance * 50000) }} />
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

const mapStateToProps = function(state) {
  return {
    wallet: state.user.wallet_id,
    balance: state.user.balance
  }
}

const mapDispatchToProps = {
  setBalance: setWalletBalance
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: {
        dashboard: require(`../../locales/${locale}/dashboard.json`),
      },
    },
  };
}