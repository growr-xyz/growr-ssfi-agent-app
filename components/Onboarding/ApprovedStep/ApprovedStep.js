import { useTranslations } from "next-intl"
import { useSelector, useDispatch } from 'react-redux'
import { acceptGrowrTerms, rejectGrowrTerms } from '../../../redux/wallet'
import BaseContentLayout from '../../BaseContentLayout/BaseContentLayout'
import styles from "./ApprovedStep.module.css"

const ApprovedStep = ({ onNext }) => {
  const termsAccepted = useSelector(state => state.wallet.GrowrTermsAccepted)
  const loan = useSelector(state => state.wallet.loan)
  const t = useTranslations("onboarding")
  const dispatch = useDispatch()

  const onChangeCheckbox = ({ target }) => target.checked ? dispatch(acceptGrowrTerms()) : dispatch(rejectGrowrTerms())

  const onSubmit = () => {
    console.log('onSubmit')
  }

  return (
    <BaseContentLayout  {...{
      submitButtonProps: {
        label: t('page5.button_label'),
        onClick: onSubmit,
        disabled: !termsAccepted
      }
    }} >
      <div className={styles.wrapper}>
        <h1>{`${t('page5.title')}${loan.amount}.🎉`}</h1>

        <h4>{t('page5.congratulations')}</h4>

        <div>- {t('page5.amount')} {loan.amount}</div>
        <div>- {t('page5.apr')} {loan.apr}</div>
        <div>- {t('page5.duration')} {loan.duration}</div>
        <div>- {t('page5.instalment')} {loan.instalment}</div>
        <div>- {t('page5.next_instalment')} {loan.next_instalment}</div>
        <div>- {t('page5.last_instalment')} {loan.last_instalment}</div>
        <div>- {t('page5.total_to_repay')} {loan.total_to_repay}</div>
        <div>- {t('page5.total_interest')} {loan.total_interest}</div>

        <h4>{t('page5.loan_details')}</h4>

        <div className={styles.terms}>
          <input
            className={styles.checkbox}
              id="terms"
              name="terms"
              type="checkbox"
              checked={termsAccepted}
              onChange={onChangeCheckbox}
            />
          <label htmlFor="terms">{t("page5.agreement_check")}</label>
        </div>

        <div
          className={styles.skip}
          onClick={() => onNext()}
        >
          {t('page5.skip')}
        </div>
    </div> 
  </BaseContentLayout>
)}

export default ApprovedStep
