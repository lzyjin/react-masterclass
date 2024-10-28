const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`)
    .then(response => response.json());
}

export function fetchCoinInfo(coinId: string | undefined) {
  return fetch(`${BASE_URL}/coins/${coinId}`)
    .then(response => response.json());
}


export function fetchCoinTickers(coinId: string | undefined) {
  return fetch(`${BASE_URL}/tickers/${coinId}`)
    .then(response => response.json());
}

export function fetchCoinHistory(coinId: string | undefined) {
  const endDate = Math.floor(Date.now() / 1000); // 초
  const startDate = endDate - (1 * 60 * 60 * 24 * 7); // endDate의 일주일 전(일주일의 초 시간을 뺸다)


  // 코인파프리카 유료 api
  // return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`)
  //   .then(response => response.json());

  return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
    .then(response => response.json());
}