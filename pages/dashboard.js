import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAccount, useSendTransaction, useDisconnect } from "wagmi";
import { useBalance } from "wagmi";

export default function dashboard() {
  const [to, setTo] = useState("");
  const [value, setValue] = useState("");
  const router = useRouter();

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  });
  const { sendTransaction } = useSendTransaction({
    request: {
      to,
      value: (value * 1e18).toString(),
    },
    onSuccess: () => alert("Transaction created successfully"),
  });

  useEffect(() => {
    if (!isConnected) router.replace("/");
  }, [isConnected]);

  return (
    <div>
      <div suppressHydrationWarning>
        Balance: {data?.formatted} {data?.symbol}
      </div>
      <div suppressHydrationWarning>{address}</div>

      <button
        type="button"
        onClick={() => disconnect()}
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
        Disconnect
      </button>
      <div className="">
        To:{" "}
        <input type="text" value={to} onChange={(e) => setTo(e.target.value)} />
      </div>
      <div className="">
        Value:{""}
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <button
        type="button"
        onClick={sendTransaction}
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
        Send
      </button>
    </div>
  );
}
