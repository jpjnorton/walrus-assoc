import { useState } from "react";

export default function Web3Toggle() {
  const [isWeb3, setIsWeb3] = useState(false);

  return (
    <div className="flex items-center gap-2">

      <label className="relative inline-flex items-center cursor-pointer">
        
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={isWeb3}
          onChange={() => setIsWeb3(!isWeb3)}
        />

        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 transition-all">
            <span className="text-sm text-gray-700">
                {isWeb3 ? "Purchase With Marret" : "Normal Store"}
            </span>
        </div>
      </label>

    </div>
  );
}
