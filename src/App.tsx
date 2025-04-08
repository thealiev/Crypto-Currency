import { useState, useEffect, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddCryptoForm from "./components/AddCryptoForm";
import CryptoList from "./components/CryptoList";
import OnlineStatusIndicator from "./components/OnlineStatusIndicator";
import ThemeToggle from "./components/ThemeToggle";
import { useUpdateAllCryptos } from "./hooks/useCrypto";
import { Crypto } from "./types/types";
import SkeletonCryptoList from './components/SkeletonCryptoList';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();
const LOCAL_STORAGE_KEY = "trackedCryptos";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [cryptos, setCryptos] = useState<Crypto[]>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cryptos));
  }, [cryptos]);

  const handleCryptoUpdate = useCallback((name: string, newRate: number) => {
    setCryptos((prev) =>
      prev.map((crypto) => {
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
      })
    );
  }, []);
  const updateAll = useUpdateAllCryptos(cryptos, handleCryptoUpdate);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  <ToastContainer
    position="top-right"
    autoClose={3000}
    pauseOnHover
    theme="colored"
  />;


  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="container mx-auto max-w-2xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold">Crypto Tracker</h1>
            
            <ThemeToggle />
          </div>

          <OnlineStatusIndicator />
          
          {loading ? <SkeletonCryptoList /> : (
            <AddCryptoForm
              onAdd={(name) =>
                setCryptos((prev) => [
                  ...prev,
                  { name, currentRate: null, previousRate: null, trend: null },
                ])
              }
              existingCryptos={cryptos.map((c) => c.name)}
            
            />)}

          <div className="flex justify-end mb-4">
            <button
              onClick={updateAll}
              className="cursor-pointer px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Update All
            </button>
          </div>

          <CryptoList
            cryptos={cryptos}
            onDelete={(name) =>
              setCryptos((prev) => prev.filter((c) => c.name !== name))
            }
            onRateUpdate={handleCryptoUpdate}
          />
        </div>
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
};

export default App;
