import { useERC20Balances } from "react-moralis";

const ERC20Balances = () => {
    const { fetchERC20Balances, data, isLoading, isFetching, error } =
	useERC20Balances();
	return (
		<div>
			{error && <>{JSON.stringify(error)}</>}
			<button
				onClick={() =>
					fetchERC20Balances({ params: { chain: "0x1" } })
				}>
				Refetch
			</button>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
};

export default ERC20Balances