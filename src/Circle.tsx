import styled from "styled-components"
import {useState} from "react";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: ${props => props.bgColor};
    border: 1px solid ${props => props.borderColor};
`;

interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}

export default function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
  const [counter, setCounter] = useState(0);

  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>{text}</Container>
  );
}
