import { useTranslations } from "next-intl";
import { useSelector, useDispatch } from 'react-redux'
import { incrementCount, decrementCount } from '../redux/counter'
import Page from '../components/Page/Page'
import BaseContentLayout from '../components/BaseContentLayout/BaseContentLayout'
import OnboardingStep from '../components/Onboarding/Step1/OnboardingStep'
import WalletConnector from "../components/WalletConnector/WalletConnector"

export default function Home() {
  const t = useTranslations("onboarding");
  const dispatch = useDispatch()
  const activeStep = useSelector(state => state.counter)
  const walletConnected = useSelector(state => state.wallet)
  const totalSteps = 5;

  const onNextPress = () => {
    activeStep < totalSteps && dispatch(incrementCount())
  }

  const onBackPress = () => {
    activeStep > 1 && dispatch(decrementCount())
  }

  return (
    <Page >
      <BaseContentLayout  {...{
        submitButtonProps: {
          onClick: onNextPress,
          disabled: !walletConnected
        },
        activeStep,
        totalSteps,
        onBackPress
      }} >
        {activeStep === 1 && <WalletConnector {...{label: t("page1.title")}} />}
        {activeStep === 2 && <OnboardingStep {...{label: t("page2.title")}} />}
        {activeStep === 3 && <OnboardingStep {...{label: t("page3.title")}} />}
        {activeStep === 4 && <OnboardingStep {...{label: t("page4.title")}} />}
        {activeStep === 5 && <OnboardingStep {...{label: t("page5.title")}} />}
      </BaseContentLayout>
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
