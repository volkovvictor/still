import style from './tabs.module.css'
import { ITabs } from '@/types/general.type'

interface Props {
    tabs: ITabs[]
    setTabs: (tabs: ITabs[]) => void,
    setActiveTab: (tabName: string) => void
}

export default function Tabs({tabs, setTabs, setActiveTab}: Props) {

    const handleTab = (curTab: ITabs) => {
        const newTabs = tabs.map(tab => {

            if (tab === curTab) {
                tab.isActive = true
                setActiveTab(tab.name)
            } else {
                tab.isActive = false
            }

            return tab
        })

        setTabs(newTabs)
    }

    return (
        <div className={style.tabs}>
            {
                tabs.map(tab => <button
                    onClick={() => handleTab(tab)} 
                    key={tab.name}
                    className={`${style.tab} ${tab.isActive ? ` ${style.active}` : ''}`}>
                        {tab.value}
                    </button>)
            }
        </div>
    )
}