import { useEffect, useState } from "react";
import Input from '../../Input/Input';
import { useTranslations } from "next-intl";


const OnboardingStep = ({label, config}) => {

    const [] = useState('name')
    const t = useTranslations("onboarding");

    useEffect(() => {}, [])
    return <div>
        <h1>{label}</h1>
        <Input {...{
            placeholder: t("page7.full_name"),

        }} />
    </div>
}

export default OnboardingStep