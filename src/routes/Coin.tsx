import {Link, Outlet, useLocation, useMatch, useParams} from "react-router-dom";
import {Container, Header, Title, Loader} from "../styles/Coins";
import {Description, Overview, OverviewItem, Tab, Tabs} from "../styles/Coin";
import {useQuery} from "@tanstack/react-query";
import {fetchCoinInfo, fetchCoinTickers} from "../api";
import {Helmet} from "react-helmet";

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    },
  };
}

export default function Coin() {
  const {coinId} = useParams();
  const {state} = useLocation();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const {
    isPending: infoLoading,
    data: infoData
  } = useQuery<IInfoData>({ queryKey: ["info", coinId], queryFn: () => fetchCoinInfo(coinId) });
  const {
    isPending: tickersLoading,
    data: tickersData
  } = useQuery<IPriceData>({ queryKey: ["tickers", coinId], queryFn: () => fetchCoinTickers(coinId),
    // refetchInterval: 50000
  });

  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>{state?.name ? state.name : (loading ? "Loading..." : infoData?.name)}</title>
      </Helmet>

      <Header>
        <Title>{state?.name ? state.name : (loading ? "Loading..." : infoData?.name)}</Title>
      </Header>

      {
        loading ?
        <Loader>Loading...</Loader> :
          <>
            <Overview>
              <OverviewItem>
                <span>Rank:</span>
                <span>{infoData?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Symbol:</span>
                <span>${infoData?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Price:</span>
                <span>{`$${tickersData?.quotes.USD.price}`}</span>
              </OverviewItem>
            </Overview>

            <Description>{infoData?.description}</Description>

            <Overview>
              <OverviewItem>
                <span>Total Suply:</span>
                <span>{tickersData?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Max Supply:</span>
                <span>{tickersData?.max_supply}</span>
              </OverviewItem>
            </Overview>

            <Tabs>
              <Tab isActive={chartMatch !== null}>
                <Link to="chart">Chart</Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to="price">Price</Link>
              </Tab>
            </Tabs>

            <Outlet context={{ coinId: coinId }} />
          </>
      }
    </Container>
  );
}
