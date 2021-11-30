import { useEffect, useState } from "react";
import Input from '../../Input/Input'


const OnboardingStep = ({label, config}) => {

    const [] = useState('name')

    useEffect(() => {}, [])
    return <div>
        <h1>{label}</h1>
        <Input {...{
            placeholder: 'Full name',

        }} />
    </div>
}

export default OnboardingStep