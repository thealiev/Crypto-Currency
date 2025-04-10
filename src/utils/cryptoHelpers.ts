  import { Crypto } from "../types/types";

  export const updateCryptoRates = (
    cryptos: Crypto[],
    name: string,
    newRate: number
  ): Crypto[] => {
    return cryptos.map((crypto) => {
      if (crypto.name === name) {
        const previousRate = crypto.currentRate;
        let trend: "up" | "down" | null = null;
        if (previousRate !== null) {
          trend =
            newRate > previousRate
              ? "up"
              : newRate < previousRate
              ? "down"
              : null;
        }
        return { ...crypto, previousRate, currentRate: newRate, trend };
      }
      return crypto;
    });
  };
