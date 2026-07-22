import style from '../style/cells.module.css'

interface Cell {
    id: number
}

interface Props {
    cells: Cell[]
}

export default function Cells({ cells }: Props) {
    return (
        <div className={style.cells}>
            {
                cells.map(cell => <div key={cell.id} className={style.cell}></div>)
            }
        </div>
    )
}