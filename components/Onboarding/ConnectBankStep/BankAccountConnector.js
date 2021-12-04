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
          src="/bank.svg"
          height={143}
          width={315}
          alt="Banco Hipotecario"
        />

        <h4>{t('page2.access_note')}</h4>

        <div className={styles.lockparagraph}>
          <h4>{t('page2.data_note')}</h4>
          <Image
            src="/lock.svg"
            className={styles.bar}
            height={160}
            width={80}
            alt="Banco Hipotecario"
          />
        </div>

        <div>
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
          onClick={() => onNext()}
        >
          {t('page2.skip')}
        </div>
    </div> 
  </BaseContentLayout>
)}

export default BankAccountConnector
