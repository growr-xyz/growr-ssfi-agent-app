import Input from '../../Input/Input'
import { useTranslations } from "next-intl"
import styles from "./StepTwoForm.module.css"

const StepTwoForm = ({ onChange }) => {
  const t = useTranslations("onboarding")

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

  return (
    <div className={styles.formwrapper}>
      {formInputs.map((f, i) =>
        <Input
          key = {i}
          name = {f.name}
          type = 'number'
          placeholder = {t(f.placeholder)}
          onChange={onChange}
          />
        )}
    </div>
)}

export default StepTwoForm
