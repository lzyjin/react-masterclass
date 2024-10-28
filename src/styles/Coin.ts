import styled from "styled-components";

export const Overview = styled.div`
  display: flex;
  justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  border-radius: 10px;
`;
export const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

export const Description = styled.p`
  margin: 20px 0;
`;

export const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0;
  gap: 10px;
`;

export const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  color: ${(props) => props.isActive ? props.theme.accentColor : props.theme.textColor};
  
  a {
    padding: 7px 0;
    display: block;
  }
`;
