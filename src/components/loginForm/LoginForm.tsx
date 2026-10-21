'use client'

import style from './loginForm.module.css'
import { useMemo, useState } from "react"
import locales from "@/locales/locales"
import Input from '@/ui/input/Input'
import Link from 'next/link'
import Button from '@/ui/button/Button'
import Checkbox from '@/ui/checkbox/Checkbox'
import Info from '@/ui/info/Info'
import { InputType } from '@/types/general.type'

type FormType = 'login' | 'registration'

interface FieldI {
    label: string,
    name: string,
    type?: InputType,
}

export default function LoginForm() {

    const locale = locales()

    const [formType, setFormType] = useState<FormType>("login")

    const isLogin = formType === 'login';

    const fields = useMemo(() => {

        const data: FieldI[] = [
            {
                label: locale.emailOrPhone,
                name: 'login',
            },
            {
                label: locale.password,
                name: 'password',
                type: 'password'
            }
        ]

        if (formType === 'registration') {
            data.unshift(
                {
                    label: locale.fullname,
                    name: 'fullname',
                }
            )
        }
        return data
    }, [formType, locale])

    const onChangeType = () => {
        setFormType(type => type === 'login' ? 'registration' : 'login')
    }

    return (
        <form className={style.form}>
            <div className={style.formInputes}>
                {
                    fields.map(field => <Input 
                                            key={field.name} 
                                            label={field.label} 
                                            name={field.name}
                                            type={field.type || 'text'}/>)
                }
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