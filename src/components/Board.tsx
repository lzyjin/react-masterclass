import DraggableCard from "./DraggableCard";
import {Droppable} from "react-beautiful-dnd";
import {styled} from "styled-components";
import {useForm} from "react-hook-form";
import {ITodo, toDoState} from "../atoms";
import {useSetRecoilState} from "recoil";

const Wrapper = styled.div`
    min-height: 200px;
    background-color: ${props => props.theme.boardColor};
    border-radius: 5px;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin: 10px 0;
    font-size: 18px;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
    background-color: ${props => props.isDraggingOver ? "#dfe6e9" : ( props.isDraggingFromThis ? "#b2bec3" : "transparent" )};
    flex: 1;
    transition: background-color .3s ease-in-out;
    padding: 20px;
    border-radius: 0 0 5px 5px;
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

const Form = styled.form`
    width: 100%;
    
    input {
        width: 100%;
    }
`;

export default function Board({toDos, boardId}: IBoardProps) {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);

  const onValid = ({toDo}: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo
    }
    setToDos(allBoards => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo]
      };
    });
    setValue("toDo", "");
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register("toDo", { required: true })} type="text" placeholder={`Add Task on ${boardId}`} />
      </Form>
      <Droppable droppableId={boardId}>
        {
          (provided, snapshot) => (
            <Area
              isDraggingOver={snapshot.isDraggingOver}
              isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
              ref={provided.innerRef}
              {...provided.droppableProps}>
              {
                toDos.map((toDo, index) => (
                  <DraggableCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
                ))
              }
              {
                provided.placeholder
              }
            </Area>
          )
        }
      </Droppable>
    </Wrapper>
  );
}