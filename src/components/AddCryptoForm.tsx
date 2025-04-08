import { useState } from "react";
import { toast } from "react-toastify";
import { fetchCryptoRate } from "../services/cryptoService";

type Props = {
  onAdd: (name: string) => void;
  existingCryptos: string[];
};

const AddCryptoForm = ({ onAdd, existingCryptos }: Props) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.toUpperCase());
  };

  const handleAdd = async () => {
    const trimmed = input.trim();
    if (!trimmed) {
      toast.error("Please enter a cryptocurrency symbol.");
      return;
    }

    if (existingCryptos.includes(trimmed)) {
      toast.error(`${trimmed} has already been added.`);
      return;
    }

    const rate = await fetchCryptoRate(trimmed);
    if (rate === null) {
      toast.error(`"${trimmed}" is not a valid cryptocurrency symbol.`);
      return;
    }

    onAdd(trimmed);
    toast.success(`${trimmed} added successfully!`);
    setInput("");
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <input
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          placeholder="Enter symbol, e.g. BTC"
          onChange={handleInputChange}
        />
        <button
          onClick={handleAdd}
          className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddCryptoForm;
