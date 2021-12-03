import React from 'react'
import BaseContentLayout from '../../../components/BaseContentLayout/BaseContentLayout'
import StepOneForm from './StepOneForm'

class OnboardingStepOne extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        name: '',
        birthDate: '',
        education: '',
        status: '',
        location: '',
        terms: false,
        formErrors: true
      }
  
      this.handleInputChange = this.handleInputChange.bind(this)
      this.validateForm = this.validateForm.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
    }

    handleInputChange(event) {
        const { name, value, type, checked } = event.target
        const newValue = type !== "checkbox" ? value : checked
        this.setState({[name]: newValue}, this.validateForm)
    }

    validateForm() {
        const { name, birthDate, education, status, location, terms } = this.state

        const isValid = terms
          && name !== '' 
          && birthDate !== ''
          && education !== ''
          && status !== ''
          && location !== ''

        this.setState({formErrors: !isValid})
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
              }} >

                <div>
                    <h1>{this.props.label}</h1>

                    <StepOneForm 
                        onChange={this.handleInputChange}
                    />
                </div> 
            </BaseContentLayout>
        )
    }
}

export default OnboardingStepOne