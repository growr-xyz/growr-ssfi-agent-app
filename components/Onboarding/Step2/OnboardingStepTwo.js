import Input from '../../Input/Input';
import { useTranslations } from "next-intl";
import styles from "./OnboardingStepTwo.module.css";

const OnboardingStep = ({label}) => {
    const t = useTranslations("onboarding");

    return (
        <div>
            <h1>{label}</h1>

            <div className={styles.formwrapper}>
                <Input {...{
                    placeholder: t("page2.full_name"),
                }} />
                <Input {...{
                    placeholder: t("page2.birth_date"),
                }} />
                <Input {...{
                    placeholder: t("page2.education"),
                }} />
                <Input {...{
                    placeholder: t("page2.family_status"),
                }} />
                <Input {...{
                    placeholder: t("page2.location"),
                }} />
                <div className={styles.terms}>
                    <input
                        className={styles.checkbox}
                        type="checkbox" 
                        id="terms"
                        name="terms"
                    />
                    <label htmlFor="terms">{t("page2.confirmCheck")}</label>
                </div>
            </div>
        </div>
    )
}

export default OnboardingStep