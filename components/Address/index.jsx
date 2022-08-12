import { useState } from "react";
import { truncateAddress } from "../../helpers/utils";
import UserBlockies from "../Blockies";
import { useAccount, useConnect, useEnsName } from "wagmi";
import Spinner from "../Spinner";

const styles = {
  address: {
    height: "36px",
    display: "flex",
    gap: "5px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "9px",
    alignItems: "center",
  },
};

function Address(props) {
  const { address, isConnected } = useAccount();
  const [isClicked, setIsClicked] = useState(false);
  const {
    data: ensNAME,
    isError,
    isLoading,
  } = useEnsName({
    address: address,
  });

  if (!address) return <Spinner loading={true} />;

  const Copy = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#1780FF"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ cursor: "pointer" }}
      onClick={() => {
        navigator.clipboard.writeText(address);
        setIsClicked(true);
      }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 3v4a1 1 0 0 0 1 1h4" />
      <path d="M18 17h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4l5 5v7a2 2 0 0 1 -2 2z" />
      <path d="M16 17v2a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2" />
      <title id="copy-address">Copy Address</title>
    </svg>
  );

  return (
    <div style={{ ...styles.address, ...props.style }}>
      {props.avatar === "left" && <UserBlockies address={address} size={7} />}
      {ensNAME ? (
        <p>{ensNAME}</p>
      ) : (
        <p>{props.size ? truncateAddress(address, props.size) : address}</p>
      )}
      {props.avatar === "right" && <UserBlockies address={address} size={7} />}
      {isClicked ? <Check /> : <Copy />}
    </div>
  );
}

export default Address;

const Check = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="3"
    stroke="#21BF96"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 12l5 5l10 -10" />
    <title id="copied-address">Copied!</title>
  </svg>
);
