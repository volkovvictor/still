import style from '../style/addForm.module.css'
import Select from "@/ui/select/Select"
import useOptions from '../hooks/useOptions'
import locales from '@/locales/locales'
import { PhotoTypes } from '@/types/photos.type'
import Input from '@/ui/input/Input'
import useHandleOptions from '../hooks/useHandleOptions'

export type PortfolioType = 'new' | number

export default function AddFormSelects() {
    const locale = locales()
    const { categories, portfolioTypes, usersOptions } = useOptions()

    const {
        selectedCategory,
        setSelectedCategory,
        setSelectedPortfolioType,
        setSelectedUserID,
        date,
        setDate
    } = useHandleOptions()

    return (
        <div className={style.selects}>
                <Select options={categories} label={locale.category} setSelectedOption={(option: PhotoTypes) => setSelectedCategory(option)}/>
                    {
                        selectedCategory === "portfolio" && (
                            <>
                                <Select options={portfolioTypes} label={locale.add} setSelectedOption={(option: PortfolioType) => setSelectedPortfolioType(option)}/>
                                <Select options={usersOptions} label={locale.account} setSelectedOption={(id: string) => setSelectedUserID(id)}/>
                                {/* edit */}
                                <Input label={locale.date} name='date' type='date' onChange={setDate} value={date}/> 
                            </>
                        )
                    }
            </div>
    )
}