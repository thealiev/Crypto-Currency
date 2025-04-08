import axios from "axios";
import { CryptoPriceResponse } from "../types/types";

const API_KEY = import.meta.env.VITE_CRYPTO_COMPARE_API_KEY;

export const fetchCryptoRate = async (
  cryptoName: string
): Promise<number | null> => {
  try {
    const response = await axios.get<CryptoPriceResponse>(
      `https://min-api.cryptocompare.com/data/price?fsym=${cryptoName}&tsyms=USD&api_key=${API_KEY}`
    );

    if (
      response.status !== 200 ||
      !response.data ||
      typeof response.data.USD !== "number"
    ) {
      throw new Error(
        `Invalid cryptocurrency symbol (${cryptoName}) or API response.`
      );
    }

    return response.data.USD;
  } catch (error: unknown) {
    console.error(
      `Error fetching rate for ${cryptoName}:`,
      error instanceof Error ? error.message : String(error)
    );
    return null;
  }
};
