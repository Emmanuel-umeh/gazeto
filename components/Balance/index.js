import { useAccount, useBalance, useNetwork } from "wagmi";
import Spinner from "../Spinner";
import { LinkIcon } from "@heroicons/react/outline";
const Balance = () => {
  const { address } = useAccount();
  const {
    data: nativeBalance,
    isError,
    isLoading,
  } = useBalance({
    addressOrName: address,
    watch: true,
  });
  const { chain } = useNetwork();

  if (isLoading) {
    return (
      <div className={"pt-3 text-center"}>
        <Spinner loading={true} color={"black"} />
      </div>
    );
  }

  if (isError) {
    return <div className={"pt-3 text-center"}>...</div>;
  }

  return (
    <div className={"m-4"}>
      <p className={" mt-4 text-sm"}>Balance</p>
      {nativeBalance && (
        <p className={"text-xl"}>
          {Number(nativeBalance?.formatted).toFixed(3)} {nativeBalance?.symbol}
        </p>
      )}

      <a
        target={"_blank"}
        rel="noreferrer"
        href={`${chain?.blockExplorers?.default?.url}/address/${address}`}
        className={"mt-1 text-sm flex underline"}
      >
        <LinkIcon className="block h-4 w-4 pt-1" aria-hidden="true" />{" "}
        <p>View on explorer</p>
      </a>
    </div>
  );
};

export default Balance;
