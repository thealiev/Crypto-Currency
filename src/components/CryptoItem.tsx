import { useEffect } from "react";
import { useCrypto } from "../hooks/useCrypto";
import { FaSync, FaTimes, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Crypto } from "../types/types";

type Props = {
  crypto: Crypto;
  onDelete: (name: string) => void;
  onRateUpdate: (name: string, newRate: number) => void;
};

const CryptoItem = ({ crypto, onDelete, onRateUpdate }: Props) => {
  const { data, refetch, isError, isLoading, error } = useCrypto(crypto.name);

  useEffect(() => {
    if (data !== undefined && data !== null) {
      onRateUpdate(crypto.name, data);
    }
  }, [data, crypto.name, onRateUpdate]);

  return (
    <div className="flex items-center justify-between p-4 mb-2 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
      <div>
        <div className="font-semibold text-xl text-gray-800 dark:text-gray-100">
          {crypto.name}
        </div>
        {isLoading ? (
          <div className="text-gray-500">Loading...</div>
        ) : isError ? (
          <div className="text-red-500">
            {(error as Error)?.message || "Error fetching data"}
          </div>
        ) : (
          <div className="text-gray-800 dark:text-gray-300 flex items-center">
            <span className="mr-2 font-medium">${data?.toFixed(4)}</span>
            {crypto.currentRate !== null &&
              crypto.previousRate !== null &&
              crypto.trend && (
                <span
                  className={
                    crypto.trend === "up"
                      ? "flex items-center text-green-600"
                      : "flex items-center text-red-600"
                  }
                >
                  {crypto.trend === "up" ? (
                    <FaArrowUp className="mr-1" />
                  ) : (
                    <FaArrowDown className="mr-1" />
                  )}
                  {Math.abs(
                    ((data! - crypto.previousRate) / crypto.previousRate) * 100
                  ).toFixed(2)}
                  %
                </span>
              )}
          </div>
        )}
      </div>

      <div className="flex gap-3 items-center">
        <button
          onClick={() => refetch()}
          className="cursor-pointer p-2 text-blue-500 hover:text-blue-700 transition"
          title="Refresh Rate"
        >
          <FaSync />
        </button>
        <button
          onClick={() => onDelete(crypto.name)}
          className="cursor-pointer p-2 text-red-500 hover:text-red-700 transition"
          title="Remove Cryptocurrency"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default CryptoItem;
