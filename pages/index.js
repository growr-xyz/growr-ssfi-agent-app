import { useTranslations } from "next-intl";
import { useSelector, useDispatch } from 'react-redux'
import { incrementStep } from '../redux/steps'
import Page from '../components/Page/Page'
import BaseContentLayout from '../components/BaseContentLayout/BaseContentLayout'
import WalletConnector from "../components/WalletConnector/WalletConnector"
import OnboardingStep from '../components/Onboarding/Step1/OnboardingStep'
import OnboardingStepTwo from '../components/Onboarding/Step2/OnboardingStepTwo'
import OnboardingStepThree from "../components/Onboarding/Step3/OnboardingStepThree";

export default function Home() {
  const t = useTranslations("onboarding");
  const dispatch = useDispatch()
  const nextStep = () => dispatch(incrementStep())
  const step = useSelector(state => state.steps.step)

  return (
    <Page >
        {step === 1 && <WalletConnector {...{label: t("page1.title")}} onNext={nextStep} />}
        {step === 2 && <OnboardingStepTwo label={t("page2.title")} onNext={nextStep} />}
        {step === 3 && <OnboardingStepThree {...{label: t("page3.title")}} />}
        {step === 4 && <OnboardingStep {...{label: t("page4.title")}} />}
        {step === 5 && <OnboardingStep {...{label: t("page5.title")}} />}
    </ Page>
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