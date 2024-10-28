import {Link} from "react-router-dom";
import {Container, Header, Title, Loader, CoinList, Coin, Img} from "../styles/Coins";
import {useQuery} from "@tanstack/react-query";
import {fetchCoins} from "../api";

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export default function Coins() {
  const { isPending, data } = useQuery<ICoin[]>({ queryKey: ["allCoins"], queryFn: fetchCoins });

  return (
    <div>
      <Container>
        <Header>
          <Title>Coins</Title>
        </Header>
        {
          isPending ?
          <Loader>Loading...</Loader> :
          <CoinList>
            {
              data?.slice(0, 50).map(coin => (
                <Coin key={coin.id}>
                  <Link to={`/${coin.id}`}  state={{ name: coin.name }}>
                    <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} alt=""/>
                    {coin.name} &rarr;
                  </Link>
                </Coin>
              ))
            }
          </CoinList>
        }
      </Container>
    </div>
  );
}