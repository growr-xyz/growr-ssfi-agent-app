import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslations } from 'next-intl';
import { useMutation, gql } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import { setGoal } from '../../../redux/user';
import BaseContentLayout from '../../../components/BaseContentLayout/BaseContentLayout';
import Input from '../../Input/Input';
import styles from './GoalStep.module.css';

function GoalStep ({ onNext }) {
  // const userId = useSelector((state) => state.user.userId);
  const goal = useSelector((state) => state.user?.goals[0]);
  const dispatch = useDispatch();

  if (!goal.goalId) dispatch(setGoal({...goal, goalId: uuidv4()}));

  const t = useTranslations("onboarding");

  const inputFields = [{
    type: 'text',
    name: 'goalType',
    placeholder: 'page4.goal_type'
  }, {
    name: 'amountSaved',
    placeholder: 'page4.amount_saved',
  }, {
    name: 'amountNeeded',
    placeholder: 'page4.amount_needed',
  }, {
    name: 'loanDuration',
    placeholder: 'page4.loan_duration',
  }]

  // const UPDATE_USER_GOAL = gql`
  //   mutation updateGoal{
  //     updateGoal(goalData:{
  //       name:"${goal.goalType}",
  //       duration:"${goal.loanDuration}",
  //       availableAmount:"${goal.amountSaved}",
  //       amountToBorrow:"${goal.amountNeeded}"
  //     }, userId:"${userId}"){
  //       _id,
  //       name,
  //       duration,
  //       availableAmount,
  //       amountToBorrow
  //     }
  //   }
  // `

  // const [updateUserGoal] = useMutation(UPDATE_USER_GOAL)

  const updateInput = e => {
    dispatch(setGoal({
      ...goal,
      [e.target.name]: e.target.value
    }))
  }

  const onFormSubmit = () => {
    // TODO: Get offers from pond factory: list of VCs => provide details => OK/NOK
    // dispatch(setGoal(goals));
    // updateUserGoal()
    //   .then(res => {
    //     res.data.updateGoal._id && setGoalId(res.data.updateGoal._id)
    onNext()
    // })
    // .catch(err => err)
  }

  return (
    <BaseContentLayout  {...{
      submitButtonProps: {
        label: t('submitBtn'),
        onClick: onFormSubmit,
        disabled: goal.goalType === '' 
        || goal.amountSaved < 1
        || goal.amountNeeded < 1
        || goal.loanDuration < 1
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

// const mapStateToProps = function(state) {
//   return {
//     userId: state.user.userId
//   }
// }

// const mapDispatchToProps = {
//   setGoalId
// }

// export default connect(mapStateToProps, mapDispatchToProps)(GoalStep)
export default GoalStep;