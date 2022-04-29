export interface CurrencyDto {
  data: Currency[]
}

export interface Currency {
  exchangeId:	string;
  name:	string;
  rank:	string;
  percentTotalVolume:	string;
  volumeUsd:string;
  tradingPairs:	string;
  socket:	boolean;
  exchangeUrl:string;
  updated: number;
}
