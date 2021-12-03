import React from 'react'
import Input from '../../Input/Input'
import { useTranslations } from "next-intl";
import styles from "./OnboardingStepThree.module.css"
import BaseContentLayout from '../../../components/BaseContentLayout/BaseContentLayout'

class OnboardingStepThree extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        income: '',
        other: '',
        unofficial: '',
        expenses: '',
        dependants: '',
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
        const { income, other, unofficial, expenses, dependants } = this.state

        const isValid = income > 0
        && other > 0
        && unofficial > 0
        && expenses > 0
        && dependants > 0

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
                },
                progress: this.props.progress
              }} >

                <div>
                    <h1>{this.props.label}</h1>

                    <div className={styles.formwrapper}>
                        <Input {...{
                            name: 'income',
                            type: 'number',
                            placeholder: 'Your official income (USD)',
                            onChange: this.handleInputChange
                        }} />
                        <Input {...{
                            name: 'other',
                            type: 'number',
                            placeholder: 'Other official household income (USD)',
                            onChange: this.handleInputChange
                        }} />
                        <Input {...{
                            name: 'unofficial',
                            type: 'number',
                            placeholder: 'Household unofficial income (USD)',
                            onChange: this.handleInputChange
                        }} />
                        <Input {...{
                            name: 'expenses',
                            type: 'number',
                            placeholder: 'Household expenses (USD)',
                            onChange: this.handleInputChange
                        }} />
                        <Input {...{
                            name: 'dependants',
                            type: 'number',
                            placeholder: 'Dependants',
                            onChange: this.handleInputChange
                        }} />
                    </div>
                </div> 

            </BaseContentLayout>
        )
    }
}

export default OnboardingStepThree

// import Input from '../../Input/Input';
// import { useTranslations } from "next-intl";
// import styles from "./OnboardingStepThree.module.css";

// const OnboardingStep = ({label}) => {
//     const t = useTranslations("onboarding");

//     return (
//         <div>
//             <h1>{label}</h1>

//             <div className={styles.formwrapper}>
//                 <Input {...{
//                     placeholder: t("page3.official_income"),
//                 }} />
//                 <Input {...{
//                     placeholder: t("page3.other_income"),
//                 }} />
//                 <Input {...{
//                     placeholder: t("page3.unofficial_income"),
//                 }} />
//                 <Input {...{
//                     placeholder: t("page3.expenses"),
//                 }} />
//                 <Input {...{
//                     placeholder: t("page3.dependants"),
//                 }} />
//             </div>
//         </div>
//     )
// }

// export default OnboardingStep