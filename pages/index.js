import Head from 'next/head'
import Image from 'next/image'
import Page from '../components/Page/Page'
import BaseContentLayout from '../components/BaseContentLayout/BaseContentLayout'
import OnboardingStep from '../components/Onboarding/Step1/OnboardingStep'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

export default function Home() {
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
        {currStep === 0 && <OnboardingStep {...{label: 'Onbaording step 1'}} />}
        {currStep === 1 && <div>Page 1</div>}
        {currStep === 2 && <div>Page 2</div>}
        {currStep === 3 && <div>Page 3</div>}
      </BaseContentLayout>
    </ Page>
  )
}
