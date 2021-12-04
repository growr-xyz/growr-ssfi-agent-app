import Image from 'next/image'
import { useTranslations } from "next-intl"
import Input from '../../Input/Input'
import BaseContentLayout from '../../BaseContentLayout/BaseContentLayout'
import styles from "./BankAccountConnector.module.css"

const BankAccountConnector = ({ onNext }) => {
  const t = useTranslations("onboarding")

  const onInputChange = (e) => {
      console.log('onChange', e.target.name, e.target.value)
  }

  const onLoginClick = () => {
    console.log('onLoginClick')
  }

  const onNextClick = () => {
    onNext()
  }

  return (
    <BaseContentLayout  {...{
      submitButtonProps: {
        onClick: onLoginClick,
        disabled: false
      }
    }} >
      <div className={styles.wrapper}>
        <h1>{t('page2.title')}</h1>

        <Image
          src="/bank.png"
          height={143}
          width={315}
          alt="Banco Hipotecario"
        />

        <h4>{t('page2.access_note')}</h4>

        <h4>{t('page2.data_note')}</h4>

        <div className={styles.formwrapper}>
          <Input
            name='username'
            type='text'
            placeholder={t('page2.username')}
            onChange={onInputChange}
          />

          <Input
            name='password'
            type='password'
            placeholder={t('page2.password')}
            onChange={onInputChange}
          />
        </div>

        <div
          className={styles.skip}
          onClick={onNextClick}
        >
          Skip for now
        </div>
    </div> 
  </BaseContentLayout>
)}

export default BankAccountConnector
