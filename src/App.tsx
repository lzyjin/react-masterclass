import styled from "styled-components";

const Container = styled.div`
    background-color: ${(props) => props.theme.bgColor};
`;

const H1 = styled.h1`
    color: ${props => props.theme.textColor};
`;

export default function App() {
  return (
    <div>
      <Container>
        <H1 color="pink">Hello</H1>
      </Container>
    </div>
  );
}