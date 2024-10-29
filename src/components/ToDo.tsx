import {IToDo, toDoState, Categories} from "../atoms";
import {useSetRecoilState} from "recoil";

export default function ToDo({id, text, category}: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name }
    } = event;

    setToDos(oldTodos => {
      const targetIndex = oldTodos.findIndex(toDo => toDo.id === id);
      const newToDo = { text, id, category: name as any }; // as any: ts 에러 회피 방법
      return [...oldTodos.slice(0, targetIndex), newToDo, ...oldTodos.slice(targetIndex + 1)]
    })
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && <button name={Categories.TO_DO} onClick={onClick}>To Do</button>}
      {category !== Categories.DOING && <button name={Categories.DOING} onClick={onClick}>Doing</button>}
      {category !== Categories.DONE && <button name={Categories.DONE} onClick={onClick}>Done</button>}
    </li>
  );
}