import { Crypto } from "../types/types";

const LOCAL_STORAGE_KEY = "trackedCryptos";

export const loadCryptosFromStorage = (): Crypto[] => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveCryptosToStorage = (cryptos: Crypto[]): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cryptos));
};
