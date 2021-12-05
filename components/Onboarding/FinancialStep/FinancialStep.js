import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslations } from "next-intl"
import { useMutation,  gql } from "@apollo/client"
import BaseContentLayout from '../../../components/BaseContentLayout/BaseContentLayout'
import Input from '../../Input/Input'
import styles from './FinancialStep.module.css'


function FinancialStep (props) {
  const { wallet, onNext } = props

  const t = useTranslations("onboarding")

  const [finances, setFinances] = useState({
      income: 0,
      other: 0,
      unofficial: 0,
      expenses: 0,
      dependants: 0,
  })

  const updateInput = e => {
    setFinances({
      ...finances,
      [e.target.name]: e.target.value
    })
  }

  const formInputs = [{
    name: 'income',
    placeholder: 'page3.official_income'
  }, {
    name: 'other',
    placeholder: 'page3.other_income',
  }, {
    name: 'unofficial',
    placeholder: 'page3.unofficial_income',
  }, {
    name: 'expenses',
    placeholder: 'page3.expenses',
  }, {
    name: 'dependants',
    placeholder: 'page3.dependants',
  }]

  const UPDATE_USER_FINANCES = gql`
    mutation updateUser{
      updateUser(
        userData:{
          officialPersonalIncome:"${finances.income}",
          officialHouseholdIncome:"${finances.other}",
          unofficialHouseholdIncome:"${finances.unofficial}",
          householdExpenses:"${finances.expenses}",
          dependants:${finances.dependants}
        }, address:"${wallet}"){
        officialPersonalIncome,
        officialHouseholdIncome,
        unofficialHouseholdIncome,
        householdExpenses,
        dependants
      }
    }
  `
  const [updateUserFinances, { data, loading, error }] = useMutation(UPDATE_USER_FINANCES)

  const onFormSubmit = () => {
    updateUserFinances()
      .then(() => onNext())
      .catch(err => err)
  }

  return (
    <BaseContentLayout  {...{
      submitButtonProps: {
        onClick: onFormSubmit,
        disabled: finances.income < 1 
        || finances.other < 1
        || finances.unofficial < 1
        || finances.expenses < 1
        || finances.dependants <1
      }
    }}>
      <div className={styles.wrapper}>
        <h1>{t('page3.title')}</h1>

        <div className={styles.formwrapper}>
          {formInputs.map((f, i) =>
            <Input
              key = {i}
              name = {f.name}
              type = 'number'
              placeholder = {t(f.placeholder)}
              onChange={updateInput}
              />
            )}
        </div>
      </div> 
    </BaseContentLayout>
  )
}

const mapStateToProps = function(state) {
  return {
    wallet: state.wallet.id
  }
}

export default connect(mapStateToProps)(FinancialStep)
