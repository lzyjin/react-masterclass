import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {Container, Header, Title, Loader, CoinList, Coin, Img} from "../styles/Coins";

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export default function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://api.coinpaprika.com/v1/coins`)
      const json = await response.json();
      setCoins(json.slice(0, 50));
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <Container>
        <Header>
          <Title>Coins</Title>
        </Header>
        {
          loading ?
          <Loader>Loading...</Loader> :
          <CoinList>
            {
              coins.map(coin => (
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