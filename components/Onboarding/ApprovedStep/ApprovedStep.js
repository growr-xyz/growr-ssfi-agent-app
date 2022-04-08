import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslations } from 'next-intl';
import { useMutation,  gql } from '@apollo/client';
import { acceptGrowrTerms, rejectGrowrTerms } from '../../../redux/user';
import BaseContentLayout from '../../BaseContentLayout/BaseContentLayout';
import { createDidFormat, createPresentation } from "../../../utils/vcUtils";
import styles from './ApprovedStep.module.css';
import { useWeb3React } from "@web3-react/core";
import { injected } from '../../../utils/connectors';
import {
	// findBestOffer,
	// verifyCredentials,
	// registerVerification,
	borrow,
	// repay,
	// fetchRepaymentHistory,
	// getLoanDetails,
} from "../../../utils/contractHelper.js";

function ApprovedStep({ onNext }) {
  const { activate, library } = useWeb3React();

  useEffect(() => {
    try {
      activate(injected, undefined, true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const walletId = useSelector((state) => state.user.walletId);
  const chainId = useSelector((state) => state.user.chainId);
  const loan = useSelector((state) => state.user.goals[0].loan);
  const jwt = useSelector((state) => state.user.verifiableCredentials[0]);
  const growrTermsAccepted = useSelector((state) => state.user.growrTermsAccepted);
  const dispatch = useDispatch();

  const t = useTranslations("onboarding");

  const onChangeCheckbox = ({ target }) => target.checked ? dispatch(acceptGrowrTerms()) : dispatch(rejectGrowrTerms());

  const VERIFY_VCS = gql`
    mutation verifyVCs($did: String, $vps: [String], $pondAddress: String) {
      verifyVCs(did: $did, vps: $vps, pondAddress: $pondAddress)
    }
  `;

  const [verifyVCs, { data, loading, error }] = useMutation(VERIFY_VCS, {
    variables: {
      did: createDidFormat(walletId, chainId),
      // vps: '',
      // pondAddress: ''
    }
  });

  const onSubmit = async() => {
    // TODO: Apply to the verifier & get disbursement from the pond
    // try {
      console.log('creating presentation...', walletId, jwt);
      let vpJwt = await createPresentation(library, walletId, jwt);
      console.log('vpJwt', vpJwt);

      if (vpJwt) {
        verifyVCs({ variables: {
          vps: [vpJwt],
          pondAddress: loan.pondAddress
        }}).then(async() => {
          console.log('Presentation verified, now borrow');
          await borrow(library, account, {
  					amount: offer.details.amount,
	  				duration: offer.details.duration,
		  			pondAddress: offer.pondAddress,
			  	});
				  console.log(`Borrower got the money`);

          // onNext();
        }).catch(err => {
          console.error(err);
        })
      }
    // } catch (error) {
    //   console.log(error.message);
    // }

    // updateLoan()
    //   .then(() => {
    //     onNext()
    //   })
    //   .catch(err => err)
  };

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