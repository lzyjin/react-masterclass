import {Draggable} from "react-beautiful-dnd";
import {styled} from "styled-components";
import React from "react";

const Card = styled.div<{isDragging: boolean}>`
    background-color: ${props =>props.isDragging ? "#74b9ff" :  props.theme.cardColor};
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: ${props => props.isDragging ? "0 2px 5px rgba(0, 0, 0, 0.3)" : ""};
    
    &:last-child {
        margin-bottom: 0;
    }
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DraggableCard({toDoId, toDoText, index}: IDraggableCardProps) {
  return (
    <Draggable draggableId={toDoId+""} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);