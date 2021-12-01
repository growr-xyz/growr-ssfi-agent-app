import Head from 'next/head'
import Image from 'next/image'
import Page from '../components/Page/Page'
import BaseContentLayout from '../components/BaseContentLayout/BaseContentLayout'
import OnboardingStep from '../components/Onboarding/Step1/OnboardingStep'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { useTranslations } from "next-intl"

export default function Home() {
  const t = useTranslations("onboarding");
  const [currStep, setCurrStep] = useState(0)

  const onBackPress = () => {
    setCurrStep(currStep - 1)
  }



  return (
    <Page >
      <BaseContentLayout  {...{
        submitButtonProps: {
          onClick: () => {setCurrStep(currStep + 1)},
        },
        currStep,
        totalSteps: 3,
        onBackPress
      }} >
        {currStep === 0 && <OnboardingStep {...{label: t("page1.title")}} />}
        {currStep === 1 && <div>{t("page2.title")}</div>}
        {currStep === 2 && <div>{t("page3.title")}</div>}
        {currStep === 3 && <div>{t("page4.title")}</div>}
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
