import { Crypto } from "../types/types";
import CryptoItem from "./CryptoItem";

type Props = {
  cryptos: Crypto[];
  onDelete: (name: string) => void;
  onRateUpdate: (name: string, newRate: number) => void;
};

const CryptoList = ({ cryptos, onDelete, onRateUpdate }: Props) => {
  return (
    <div className="space-y-4">
      {cryptos.map((crypto) => (
        <CryptoItem
          key={crypto.name}
          crypto={crypto}
          onDelete={onDelete}
          onRateUpdate={onRateUpdate}
        />
      ))}
    </div>
  );
};

export default CryptoList;
