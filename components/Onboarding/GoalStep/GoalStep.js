import React from 'react'
import BaseContentLayout from '../../../components/BaseContentLayout/BaseContentLayout'
import GoalStepForm from './GoalStepForm'
import styles from './GoalStep.module.css'

class GoalsStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      goal: '',
      savings: 0,
      loan: 0,
      duration: 0,
      formErrors: true
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.validateForm = this.validateForm.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  handleInputChange(event) {
    const { name, value  } = event.target
    this.setState({ [name]: value }, this.validateForm)
  }

  validateForm() {
    const { goal, savings, loan, duration } = this.state

    const isValid = goal !== ''
    && savings > 0
    && loan > 0
    && duration > 0

    this.setState({ formErrors: !isValid })
  }

  onSubmit() {
    !this.state.formErrors && this.props.onNext()
  }

  render() {
    return (
      <BaseContentLayout  {...{
        submitButtonProps: {
          onClick: this.onSubmit,
          disabled: this.state.formErrors
        }
      }}>
        <div className={styles.wrapper}>
          <h1>{this.props.label}</h1>

           <GoalStepForm onChange={this.handleInputChange} />
        </div> 
      </BaseContentLayout>
    )
  }
}

export default GoalsStep
