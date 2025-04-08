import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCryptoRate } from "../services/cryptoService";

export const useCrypto = (name: string) => {
  return useQuery<number | null, Error>({
    queryKey: ["crypto", name],
    queryFn: async () => {
      const result = await fetchCryptoRate(name);
      if (result === null) {
        throw new Error("Failed to fetch cryptocurrency data");
      }
      return result;
    },
    staleTime: 10000,
    refetchInterval: 60000,
    retry: 1,
    retryDelay: 1500,
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useUpdateAllCryptos = (cryptos: { name: string; }[], _handleCryptoUpdate?: (name: string, newRate: number) => void) => {
  const queryClient = useQueryClient();
  return () => {
    cryptos.forEach((crypto) =>
      queryClient.invalidateQueries({ queryKey: ["crypto", crypto.name] })
    );
  };
};
