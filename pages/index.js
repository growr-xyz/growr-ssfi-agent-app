import { useTranslations } from "next-intl";
import { useSelector, useDispatch } from 'react-redux'
import { incrementCount, decrementCount } from '../redux/counter'
import Page from '../components/Page/Page'
import BaseContentLayout from '../components/BaseContentLayout/BaseContentLayout'
import OnboardingStep from '../components/Onboarding/Step1/OnboardingStep'

export default function Home() {
  const t = useTranslations("onboarding");
  const dispatch = useDispatch()
  const activeStep = useSelector(state => state.counter)
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
          onClick: onNextPress
        },
        activeStep,
        totalSteps,
        onBackPress
      }} >
        {activeStep === 1 && <OnboardingStep {...{label: t("page1.title")}} />}
        {activeStep === 2 && <h1>{t("page2.title")}</h1>}
        {activeStep === 3 && <h1>{t("page3.title")}</h1>}
        {activeStep === 4 && <h1>{t("page4.title")}</h1>}
        {activeStep === 5 && <h1>{t("page5.title")}</h1>}
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
