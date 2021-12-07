import { useTranslations } from "next-intl";
import { useSelector, useDispatch } from 'react-redux'
import { incrementStep } from '../redux/steps'
import Page from '../components/Page/Page'
import ProgressHeader from "../components/ProgressHeader/ProgressHeader"
import WalletConnector from "../components/WalletConnector/WalletConnector"
import BankAccountConnector from "../components/Onboarding/ConnectBankStep/BankAccountConnector"
import FinancialStep from "../components/Onboarding/FinancialStep/FinancialStep"
import GoalStep from "../components/Onboarding/GoalStep/GoalStep"
import ApprovedStep from "../components/Onboarding/ApprovedStep/ApprovedStep"
import LastStep from "../components/Onboarding/LastStep/LastStep"

export default function Home() {
  const t = useTranslations("onboarding");
  const dispatch = useDispatch()
  const nextStep = () => dispatch(incrementStep())
  const step = useSelector(state => state.steps.step)
  const total = useSelector(state => state.steps.total)
  const hidden = step < 1 || step > 3
  const progress = {
    step,
    total
  }

  return (
    <Page >
      <ProgressHeader {...{ progress, hidden }}/>
        {step === 0 && <WalletConnector {...{onNext: nextStep}} />}
        {step === 1 && <BankAccountConnector {...{onNext: nextStep}} />}
        {step === 2 && <FinancialStep {...{onNext: nextStep}} />}
        {step === 3 && <GoalStep {...{onNext: nextStep}} />}
        {step === 4 && <ApprovedStep {...{onNext: nextStep}} />}
        {step === 5 && <LastStep />}
    </Page>
  )
}


export function getStaticProps({ locale }) {
  return {
    props: {
      messages: {
        onboarding: require(`../locales/${locale}/onboarding.json`)
      }
    },
  };
}
