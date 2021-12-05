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
        {step === 0 && <WalletConnector {...{label: t("page1.title"), onNext: nextStep}} />}
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
        onboarding: require(`../locales/${locale}/onboarding.json`),
        dashboard: require(`../locales/${locale}/dashboard.json`),
        invoice: require(`../locales/${locale}/invoice.json`),
      }
    },
  };
}  

{/* <BaseContentLayout  {...{
  submitButtonProps: {
    onClick: onNextPress,
    disabled: !walletConnected // || activeStep === 2
  },
  activeStep,
  totalSteps,
  onBackPress
}} >
  {activeStep === 1 && <WalletConnector {...{label: t("page1.title")}} />}
  {activeStep === 2 && <OnboardingStepTwo label={t("page2.title")} onSubmit={onSubmit} />}
  {activeStep === 3 && <OnboardingStepThree {...{label: t("page3.title")}} />}
  {activeStep === 4 && <OnboardingStep {...{label: t("page4.title")}} />}
  {activeStep === 5 && <OnboardingStep {...{label: t("page5.title")}} />}
</BaseContentLayout> */}