import Input from '../../Input/Input'
import { useTranslations } from "next-intl"
import styles from "./StepOneForm.module.css"

const StepOneForm = ({ onChange }) => {
  const t = useTranslations("onboarding")
  
  const formInputs = [{
    name: 'name',
    placeholder: 'page7.full_name'
  }, {
    name: 'birthDate',
    placeholder: 'page7.birth_date',
  }, {
    name: 'education',
    placeholder: 'page7.education',
  }, {
    name: 'status',
    placeholder: 'page7.family_status',
  }, {
    name: 'location',
    placeholder: 'page7.location',
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
        <label htmlFor="terms">{t("page7.confirmCheck")}</label>
      </div>
    </div>
  )
}

export default StepOneForm
