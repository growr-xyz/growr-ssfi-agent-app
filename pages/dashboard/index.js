import Image from 'next/image'
import { useEffect } from 'react'
import { useQuery, gql } from "@apollo/client"
import { connect } from 'react-redux'
import { useRouter } from "next/router"
import { useTranslations } from "next-intl"
import SimpleConnector from "../../components/WalletConnector/SimpleConnector"
import { Header, Page, Widget, Section, Goal } from '../../components'
import HelmetIcon from "../../components/Icons/Helmet"
import Link from "next/link"
import { Bitcoin, Budget } from "../../components/Quests"
import { getWalletBalance } from '../../utils/swap';
import styles from "./Dashbaord.module.css"


function Dashboard ({wallet}) {

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
        }}
      }
    `

// const data = {
//   "wallet": {
//     "address": "0xD4A420FD1b2a33514BFBaEBab738999E708D1FC6",
//     "balance": "1200.00",
//     "user": {
//       "fullName": "Camila Busd.01",
//       "dateOfBirth": "2021-11-17",
//       "_id": "61ab9dbbd52730d9c0c77f63",
//       "goals": [
//         {
//           "name": "Car Purchase",
//           "duration": "12M",
//           "availableAmount": "0.00",
//           "amountToBorrow": "1500.00",
//           "isAchieved": false,
//           "loan": {
//             "amount": "1200.00",
//             "apr": "12.34%",
//             "duration": "9",
//             "instalment": "12.22%",
//             "nextInstalmentDue": "116.96",
//             "lastInstalmentDue": "1670630400000",
//             "totalToRepay": "1200.00", //"1334.22"
//             "totalInterest": "134.22"
//           }
//         }
//       ]
//     }
//   }
// }

  const goToDashboard = () => {
    router.push('/dashboard');
  }

  const printBalance = value => console.log('Wallet balance:', value);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getWalletBalance(wallet, printBalance)
  }, [wallet])

  // TBD - get wallet balance
  const balance = 1200.0;

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
          balance: "$"+balance, // TBD - wallet balance here
          currency: "US Dollar (xUSD)",
        }}
      />
      <Section label={t('goals.title')}>
        {goals?.map((goal) => (
          <div
            key={goal.name}
            onClick={() => {
              console.log('WEIRD');
              router.push(`/goal?goalId=${goal._id}`);
            }}
            style={{ display: "inline-block" }}
          >
            <Goal {...{ ...goal, details: `${goal.isAchieved?t("goals.status.funded"):t("goals.status.progress")}, $${Math.round(goal.loan.totalToRepay)} ${t("goals.status.due")}`, progress: balance/(parseFloat(goal.amountToBorrow) + parseFloat(goal.availableAmount)), value:balance }} />
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
    wallet: state.user.wallet_id
  }
}

export default connect(mapStateToProps)(Dashboard);

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: {
        dashboard: require(`../../locales/${locale}/dashboard.json`),
      },
    },
  };
}