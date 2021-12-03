import React from 'react'
import Input from '../../Input/Input'
import { useTranslations } from "next-intl";
import styles from "./OnboardingStepTwo.module.css"
import BaseContentLayout from '../../../components/BaseContentLayout/BaseContentLayout'

class OnboardingStepTwo extends React.Component {
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
                    {/* <h1>Now, some personal details.</h1> */}

                    <div className={styles.formwrapper}>
                        <Input {...{
                            // placeholder: t("page2.full_name"),
                            name: 'name',
                            placeholder: 'Name',
                            onChange: this.handleInputChange
                        }} />
                        <Input {...{
                            // placeholder: t("page2.birth_date"),
                            name: 'birthDate',
                            placeholder: 'Date of birth',
                            onChange: this.handleInputChange
                        }} />
                        <Input {...{
                            // placeholder: t("page2.education"),
                            name: 'education',
                            placeholder: 'Education',
                            onChange: this.handleInputChange
                        }} />
                        <Input {...{
                            // placeholder: t("page2.family_status"),
                            name: 'status',
                            placeholder: 'Family status',
                            onChange: this.handleInputChange
                        }} />
                        <Input {...{
                            // placeholder: t("page2.location"),
                            name: 'location',
                            placeholder: 'Location',
                            onChange: this.handleInputChange
                        }} />
                        <div className={styles.terms}>
                            <input
                                className={styles.checkbox}
                                type="checkbox" 
                                id="terms"
                                name="terms"
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="terms">Accept terms and conditions</label>
                        </div>
                    </div>
                </div> 
            </BaseContentLayout>
        )
    }
}

// const OnboardingStep = ({label}) => {
//     const t = useTranslations("onboarding");

//     return (
//         <div>
//             <h1>{label}</h1>

//             <div className={styles.formwrapper}>
//                 <Input {...{
//                     placeholder: t("page2.full_name"),
//                 }} />
//                 <Input {...{
//                     placeholder: t("page2.birth_date"),
//                 }} />
//                 {/* <Input {...{
//                     placeholder: t("page2.education"),
//                 }} /> */}
//                 <select value='' onChange={() => {}}>
//                     <option value="Secondary">Primary</option>
//                     <option value="Secondary">Secondary</option>
//                     <option value="High school">High school</option>
//                     <option value="University">University</option>
//                     <option value="Post graduate">Post graduate</option>
//                 </select>

//                 <Input {...{
//                     placeholder: t("page2.family_status"),
//                 }} />
//                 <Input {...{
//                     placeholder: t("page2.location"),
//                 }} />
//                 <div className={styles.terms}>
//                     <input
//                         className={styles.checkbox}
//                         type="checkbox" 
//                         id="terms"
//                         name="terms"
//                         onChange={this.handleInputChange}
//                     />
//                     <label htmlFor="terms">{t("page2.confirmCheck")}</label>
//                 </div>
//             </div>
//         </div>
//     )
// }

export default OnboardingStepTwo