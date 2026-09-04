import Icon from '../icon/Icon'
import style from './loader.module.css'

export default function Loader() {
    return <div className={style.loader}>
        <Icon name='loader' strokeWidth={7}/>
    </div>
}