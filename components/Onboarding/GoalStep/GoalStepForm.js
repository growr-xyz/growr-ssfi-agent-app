import Input from '../../Input/Input'
import { useTranslations } from "next-intl"
import styles from "./GoalStepForm.module.css"

const GoalStepForm = ({ onChange }) => {
  const t = useTranslations("onboarding")

  const formInputs = [{
    name: 'goal',
    type: 'text',
    placeholder: 'page4.goal_type'
  }, {
    name: 'savings',
    placeholder: 'page4.amount_saved',
  }, {
    name: 'loan',
    placeholder: 'page4.amount_needed',
  }, {
    name: 'duration',
    placeholder: 'page4.loan_duration',
  }]

  return (
    <div className={styles.formwrapper}>
      {formInputs.map((f, i) =>
        <Input
          key = {i}
          name = {f.name}
          type = {f.type || 'number'}
          placeholder = {t(f.placeholder)}
          onChange={onChange}
          />
        )}
    </div>
  )
}

export default GoalStepForm
