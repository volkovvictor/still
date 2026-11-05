'use client'

import style from './loginForm.module.css'
import { useEffect, useMemo, useState } from "react"
import locales from "@/locales/locales"
import Input from '@/ui/input/Input'
import Link from 'next/link'
import Button from '@/ui/button/Button'
import Checkbox from '@/ui/checkbox/Checkbox'
import Info from '@/ui/info/Info'
import { InputType } from '@/types/general.type'
import { useRegister, useLogin, useAuth } from './hooks/authApi'
import useToken from '@/store/useToken'

type FormType = 'login' | 'registration'

interface FieldI {
    label: string,
    name: string,
    type?: InputType,
    onChange: React.Dispatch<React.SetStateAction<string>>
}

export default function LoginForm() {

    const locale = locales()

    const onRegister = useRegister()
    const onLogin = useLogin()

    const [formType, setFormType] = useState<FormType>("login")

    const [fullname, setFullname] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const isLogin = formType === 'login';

    const onChangeType = () => {
        setFormType(type => type === 'login' ? 'registration' : 'login')
    }

    const onSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()

        if (isLogin) {
            onLogin({email, password})
        } else {
            onRegister({ fullname, email, password })
            .then(res => {
                if (res) {
                    setFormType("login")
                }
            })
            .catch(res => console.log("error " + res.error))
        }

        setFullname("")
        setEmail("")
        setPassword("")
    }

    return (
        <form className={style.form} onSubmit={onSubmit}>
            <div className={style.formInputes}>
                { !isLogin && <Input 
                    value={fullname}
                    label={locale.fullname} 
                    name='fullname'
                    onChange={setFullname}/> }
                <Input 
                    value={email}
                    label={locale.emailOrPhone} 
                    name='login'
                    onChange={setEmail}/>
                <Input 
                    value={password}
                    label={locale.password} 
                    name='password'
                    type='password'
                    onChange={setPassword}/>
            </div>
            { isLogin && <Link className={style.formLink} href={'/'}>{locale.forgotPassword}</Link> }
            { formType === 'registration' && (
                <div className={style.privatCheck}>
                    <Checkbox text={locale.isPrivatAccount}/>
                    <Info text={locale.privatAccountText}/>
                </div>
            ) }
            <div className={style.formFooter}>
                <Button addStyles={{ minWidth: '50%' }}>{isLogin ? locale.getLogin : locale.getRegistration}</Button>
                <p onClick={onChangeType}>{isLogin ? locale.noAccount : locale.accountExist} <span className={style.formLink}>{isLogin ? locale.getRegistration : locale.getLogin}</span></p>
            </div>
        </form>
    )
}