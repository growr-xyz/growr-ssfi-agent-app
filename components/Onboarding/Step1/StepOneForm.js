import Input from '../../Input/Input'
import { useTranslations } from "next-intl"
import styles from "./StepOneForm.module.css"

const StepOneForm = ({ onChange }) => {
  const t = useTranslations("onboarding")
  
  const formInputs = [{
    name: 'name',
    placeholder: 'page2.full_name'
  }, {
    name: 'birthDate',
    placeholder: 'page2.birth_date',
  }, {
    name: 'education',
    placeholder: 'page2.education',
  }, {
    name: 'status',
    placeholder: 'page2.family_status',
  }, {
    name: 'location',
    placeholder: 'page2.location',
  }]

  return (
    <div className={styles.formwrapper}>
      {formInputs.map((f, i) =>
        <Input
          key = {i}
          name = {f.name}
          placeholder = {t(f.placeholder)}
          onChange={onChange}
        />
      )}

      <div className={styles.terms}>
        <input
          className={styles.checkbox}
            type="checkbox" 
            id="terms"
            name="terms"
            onChange={onChange}
          />
        <label htmlFor="terms">{t("page2.confirmCheck")}</label>
      </div>
    </div>
  )
}

export default StepOneForm
