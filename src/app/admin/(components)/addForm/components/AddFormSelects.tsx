import style from '../style/addForm.module.css'
import Select from "@/ui/select/Select"
import useOptions from '../hooks/useOptions'
import locales from '@/locales/locales'
import { PhotoTypes } from '@/types/photos.type'
import Input from '@/ui/input/Input'
import { PortfolioType } from '../AddForm'

interface Props {
    selectedCategory: PhotoTypes,
    date: string,
    onSelectCategory: (option: PhotoTypes) => void
    onSetDate: (date: string) => void
    onSelectUser: (id: string) => void
    onSelectPortfolioType: (type: PortfolioType) => void

}

export default function AddFormSelects(props: Props) {
    const locale = locales()
    const { categories, portfolioTypes, usersOptions } = useOptions()

    return (
        <div className={style.selects}>
                <Select options={categories} label={locale.category} setSelectedOption={(option: PhotoTypes) => props.onSelectCategory(option)}/>
                    {
                        props.selectedCategory === "portfolio" && (
                            <>
                                <Select options={portfolioTypes} label={locale.add} setSelectedOption={(option: PortfolioType) => props.onSelectPortfolioType(option)}/>
                                <Select options={usersOptions} label={locale.account} setSelectedOption={(id: string) => props.onSelectUser(id)}/>
                                {/* edit */}
                                <Input label={locale.date} name='date' type='date' onChange={props.onSetDate} value={props.date}/> 
                            </>
                        )
                    }
            </div>
    )
}