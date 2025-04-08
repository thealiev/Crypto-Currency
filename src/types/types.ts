export type Crypto = {
  name: string;
  currentRate: number | null;
  previousRate: number | null;
  trend: "up" | "down" | null;
};

export type CryptoPriceResponse = {
  USD: number;
};
