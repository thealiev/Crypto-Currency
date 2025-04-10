import { useState, useEffect, useCallback } from "react";
import { Crypto } from "../types/types";
import { loadCryptosFromStorage, saveCryptosToStorage } from "../utils/storage";
import { updateCryptoRates } from "../utils/cryptoHelpers";

export const useCryptoState = () => {
  const [loading, setLoading] = useState(true);
  const [cryptos, setCryptos] = useState<Crypto[]>(loadCryptosFromStorage);

  useEffect(() => {
    saveCryptosToStorage(cryptos);
  }, [cryptos]);

  useEffect(() => {
    if (cryptos.length > 0) setLoading(false);
  }, [cryptos]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCryptoUpdate = useCallback((name: string, newRate: number) => {
    setCryptos((prev) => updateCryptoRates(prev, name, newRate));
  }, []);

  return { cryptos, setCryptos, loading, handleCryptoUpdate };
};
