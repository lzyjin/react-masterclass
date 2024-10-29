import {useForm} from "react-hook-form";
import {categoryState, toDoState} from "../atoms";
import {useRecoilValue, useSetRecoilState} from "recoil";

interface IForm {
  toDo: string;
}

export default function CreateToDo() {
  const setTodos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register,handleSubmit, setValue, formState: {errors}  } = useForm<IForm>();

  const handleValid = ({toDo}: IForm) => {
    setTodos(oldToDos => [{
      id: Date.now(),
      text: toDo,
      category
    }, ...oldToDos]);
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input {...register("toDo", {
        required: "Please write a To Do."
      })} type="text" placeholder="Write a to do"/>
      { errors?.toDo?.message }
      <button>Add</button>
    </form>
  );
}