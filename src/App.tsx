import cls from './App.module.scss';
import ColumnsList from "./components/ColumnsList/ColumnsList.tsx";
function App() {
  return (
    <div className={cls.app}>
      <ColumnsList/>
    </div>
  )
}

export default App
