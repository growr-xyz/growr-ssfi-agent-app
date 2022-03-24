import { useSelector, useDispatch } from 'react-redux';
import { useTranslations } from 'next-intl';
import { useMutation,  gql } from '@apollo/client';
import { acceptGrowrTerms, rejectGrowrTerms } from '../../../redux/user';
import BaseContentLayout from '../../BaseContentLayout/BaseContentLayout';
import styles from './ApprovedStep.module.css';

function ApprovedStep({ onNext }) {  
  // const termsAccepted = useSelector((state) => state.user.termsAccepted);
  const loan = useSelector((state) => state.user.goals[0].loan);
  const growrTermsAccepted = useSelector((state) => state.user.growrTermsAccepted);
  const dispatch = useDispatch();

  const t = useTranslations("onboarding");

  const onChangeCheckbox = ({ target }) => target.checked ? dispatch(acceptGrowrTerms()) : dispatch(rejectGrowrTerms());

  const onSubmit = () => {
    onNext();
    // updateLoan()
    //   .then(() => {
    //     onNext()
    //   })
    //   .catch(err => err)
  };

  // const UPDATE_LOAN = gql`
  //   mutation updateLoan{
  //     updateLoan(loanData:{
  //       duration:"9",
  //       amount:"1100.00",
  //       apr:"12.34%",
  //       nextInstalmentDue:"12.12.2021",
  //       lastInstalmentDue:"12.10.2022",
  //       totalToRepay:"1234.22",
  //       totalInterest:"134.22",
  //       instalment:"12.22%"
  //     }, goalId:"${goalId}" ){
  //       _id
  //     }
  //   }
  // `;

  // const [updateLoan, { data, loading, error }] = useMutation(UPDATE_LOAN);

  return (
    <BaseContentLayout  {...{
      submitButtonProps: {
        label: t('page5.button_label'),
        onClick: onSubmit,
        disabled: !growrTermsAccepted /*|| !goalId*/
      }
    }} >
      <div className={styles.wrapper}>
        <h1>{`${t('page5.title')}${loan.amount}.🎉`}</h1>

        <h4>{t('page5.congratulations')}</h4>

        <div>- {t('page5.amount')} {loan.amount}</div>
        <div>- {t('page5.apr')} {loan.annualPercentageRate}</div>
        <div>- {t('page5.duration')} {loan.duration}</div>
        <div>- {t('page5.instalment')} {loan.instalment}</div>
        <div>- {t('page5.next_instalment')} {loan.nextInstalment}</div>
        <div>- {t('page5.last_instalment')} {loan.lastInstalment}</div>
        <div>- {t('page5.total_to_repay')} {loan.totalToRepay}</div>
        <div>- {t('page5.total_interest')} {loan.totalInterest}</div>

        <h4>{t('page5.loan_details')}</h4>

        <div className={styles.terms}>
          <input
            className={styles.checkbox}
              id="terms"
              name="terms"
              type="checkbox"
              checked={growrTermsAccepted}
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
)};

export default ApprovedStep;