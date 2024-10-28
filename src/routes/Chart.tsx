import {useOutletContext} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {fetchCoinHistory} from "../api";
import ApexChart from "react-apexcharts";

interface ICoinIdContext {
  coinId: string
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

export default function Chart() {
  const { coinId } = useOutletContext<ICoinIdContext>();

  const {
    isPending: loading,
    data
  } = useQuery<IHistorical[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId)
  });

  return (
    <div>
      {
        loading ?
        "Loading chart..." :
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map(price => Number(price.close)) ?? []
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              width: 500,
              height: 300,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              type: "datetime",
              categories: data?.map(price => price.time_close * 1000) ?? []
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#f1c40f"],
                stops: [0, 100],
              },
            },
            colors: ["#e67e22"],
            tooltip: {
              y: {
                formatter: (value) => `${value.toFixed(2)}`,
              },
            },
        }} />
      }
    </div>
  );
}