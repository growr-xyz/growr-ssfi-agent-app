import Image from 'next/image'
import { useRouter } from "next/router"
import { useTranslations } from "next-intl"
import BaseContentLayout from '../../BaseContentLayout/BaseContentLayout'
import styles from "./LastStep.module.css"

const LastStep = () => {
  const t = useTranslations("onboarding")
  const router = useRouter()

  const onSubmit = () => {
    router.replace("/dashboard")
  }

  return (
    <BaseContentLayout  {...{
      submitButtonProps: {
        label: t('page6.button_label'),
        onClick: onSubmit
      }
    }} >
      <div className={styles.wrapper}>
        <h1>{t('page6.title')}</h1>

        <div className={styles.imagewrapper}>
          <Image
            src="/congrats.svg"
            height={98}
            width={98}
            alt="Finished"
            priority
          />
        </div>

        <h4>{t('page6.subtitle')}</h4>

        <h4><b>{t('page6.start_learning')}</b></h4>
    </div> 
  </BaseContentLayout>
)}

export default LastStep
