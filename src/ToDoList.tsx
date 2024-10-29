import {useRecoilState, useRecoilValue} from "recoil";
import ToDo from "./components/ToDo";
import {Categories, categoryState, toDoSelector} from "./atoms";
import CreateToDo from "./components/CreateToDo";

export default function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value as any);
  };

  console.log(toDos)

  return (
    <div>
      <h1>To Dos</h1>
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo/>
      {toDos?.map(aToDo => <ToDo key={aToDo.id} {...aToDo} />)}
    </div>
  );
}