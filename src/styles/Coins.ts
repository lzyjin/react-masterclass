import styled from "styled-components";

export const Container = styled.div`
  padding: 0 2rem;
  max-width: 480px;
  margin: 0 auto;
`;

export const Header = styled.div`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: ${props => props.theme.accentColor};
`;

export const CoinList = styled.ul`

`;

export const Coin = styled.li`
  background-color: rgba(0, 0, 0, 0.1);
  color: ${props => props.theme.textColor};
  margin-bottom: 1em;
  font-size: 1.125rem;
  border-radius: 1em;
    
  &:hover {
    color: ${props => props.theme.accentColor};
  }
  
  a {
    display: flex;
    align-items: center;
    gap: 1em;
    padding: 1.5em;
    transition: color .2s ease-in;
  }
`;

export const Img = styled.img`
    width: 3em;
    height: auto;
`;

export const Loader = styled.p`
  text-align: center;
`;