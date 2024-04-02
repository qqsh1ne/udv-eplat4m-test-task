import Column from "./Column/Column.tsx";
import cls from './ColumnsList.module.scss';

const ColumnsList = () => {
    return (
        <div className={cls.list}>
            <Column columnId={1}/>
            <Column columnId={2}/>
            <Column columnId={3}/>
        </div>
    );
}

export default ColumnsList;