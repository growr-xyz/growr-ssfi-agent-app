// import Head from 'next/head'
// import Image from 'next/image'
import Page from '../components/Page/Page'
import BaseContentLayout from '../components/BaseContentLayout/BaseContentLayout'
import OnboardingStep from '../components/Onboarding/Step1/OnboardingStep'
// import styles from '../styles/Home.module.css'

import { useSelector, useDispatch } from 'react-redux'
import { incrementCount, decrementCount } from '../redux/counter'

export default function Home() {
  const activeStep = useSelector(state => state.counter)
  const dispatch = useDispatch()
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
        {activeStep === 1 && <OnboardingStep {...{label: 'Onbaording step 1'}} />}
        {activeStep === 2 && <h1>Onboarding Step 2</h1>}
        {activeStep === 3 && <h1>Onboarding Step 3</h1>}
        {activeStep === 4 && <h1>Onboarding Step 4</h1>}
        {activeStep === 5 && <h1>Onboarding Step 5</h1>}
      </BaseContentLayout>
    </ Page>
  )
}
