import Input from '../../Input/Input';
import { useTranslations } from "next-intl";
import styles from "./OnboardingStepThree.module.css";

const OnboardingStep = ({label}) => {
    const t = useTranslations("onboarding");

    return (
        <div>
            <h1>{label}</h1>

            <div className={styles.formwrapper}>
                <Input {...{
                    placeholder: t("page3.official_income"),
                }} />
                <Input {...{
                    placeholder: t("page3.other_income"),
                }} />
                <Input {...{
                    placeholder: t("page3.unofficial_income"),
                }} />
                <Input {...{
                    placeholder: t("page3.expenses"),
                }} />
                <Input {...{
                    placeholder: t("page3.dependants"),
                }} />
            </div>
        </div>
    )
}

export default OnboardingStep