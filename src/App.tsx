import AddCryptoForm from "./components/AddCryptoForm";
import CryptoList from "./components/CryptoList";
import OnlineStatusIndicator from "./components/OnlineStatusIndicator";
// import ThemeToggle from "./components/ThemeToggle";
import { useUpdateAllCryptos } from "./hooks/useCrypto";
import SkeletonCryptoList from "./components/skelet-ui/SkeletonCryptoList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SkeletonAddForm from "./components/skelet-ui/SkeletonAddForm";
import { useCryptoState } from './hooks/useCryptoState';


const App = () => {
  const { cryptos, setCryptos, loading, handleCryptoUpdate } = useCryptoState();
  const updateAll = useUpdateAllCryptos(cryptos, handleCryptoUpdate)  

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Crypto Tracker</h1>

          {/* <ThemeToggle /> */}
        </div>

        <OnlineStatusIndicator />

        {loading ? (
          <SkeletonAddForm />
        ) : (
          <AddCryptoForm
            onAdd={(name) =>
              setCryptos((prev) => [
                ...prev,
                { name, currentRate: null, previousRate: null, trend: null },
              ])
            }
            existingCryptos={cryptos.map((c) => c.name)}
          />
        )}

        <div className="flex justify-end mb-4">
          <button
            onClick={updateAll}
            className="cursor-pointer px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Update All
          </button>
        </div>

        {loading ? (
          <SkeletonCryptoList />
        ) : (
          <CryptoList
            cryptos={cryptos}
            onDelete={(name) =>
              setCryptos((prev) => prev.filter((c) => c.name !== name))
            }
            onRateUpdate={handleCryptoUpdate}
          />
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default App;
