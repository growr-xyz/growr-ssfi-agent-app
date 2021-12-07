import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useTranslations } from "next-intl"
import { useMutation, gql } from "@apollo/client"
import { setGoalId } from '../../../redux/user'
import BaseContentLayout from '../../../components/BaseContentLayout/BaseContentLayout'
import Input from '../../Input/Input'
import styles from './GoalStep.module.css'

function GoalStep ({ user_id, setGoalId, onNext }) {
  const t = useTranslations("onboarding")

  const [goals, setGoals] = useState({
    goal_type: '',
    amount_saved: 0,
    amount_needed: 0,
    loan_duration: 0
  })

  const inputFields = [{
    type: 'text',
    name: 'goal_type',
    placeholder: 'page4.goal_type'
  }, {
    name: 'amount_saved',
    placeholder: 'page4.amount_saved',
  }, {
    name: 'amount_needed',
    placeholder: 'page4.amount_needed',
  }, {
    name: 'loan_duration',
    placeholder: 'page4.loan_duration',
  }]

  const UPDATE_USER_GOAL = gql`
    mutation updateGoal{
      updateGoal(goalData:{
        name:"${goals.goal_type}",
        duration:"${goals.loan_duration}",
        availableAmount:"${goals.amount_saved}",
        amountToBorrow:"${goals.amount_needed}"
      }, userId:"${user_id}"){
        _id,
        name,
        duration,
        availableAmount,
        amountToBorrow
      }
    }
  `

  const [updateUserGoal] = useMutation(UPDATE_USER_GOAL)

  const updateInput = e => {
    setGoals({
      ...goals,
      [e.target.name]: e.target.value
    })
  }

  const onFormSubmit = () => {
    updateUserGoal()
      .then(res => {
        res.data.updateGoal._id && setGoalId(res.data.updateGoal._id)
        onNext()
      })
      .catch(err => err)
  }

  return (
    <BaseContentLayout  {...{
      submitButtonProps: {
        label: t('submitBtn'),
        onClick: onFormSubmit,
        disabled: goals.goal_type === '' 
        || goals.amount_saved < 1
        || goals.amount_needed < 1
        || goals.loan_duration < 1
      }
    }}>
      <div className={styles.wrapper}>
        <h1>{t('page4.title')}</h1>

        <div className={styles.formwrapper}>
          {inputFields.map((f, i) =>
            <Input
              key = {i}
              name = {f.name}
              type = {f.type || 'number'}
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
    user_id: state.user.user_id
  }
}

const mapDispatchToProps = {
  setGoalId
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalStep)
