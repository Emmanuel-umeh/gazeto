/* This example requires Tailwind CSS v2.0+ */
import {useEffect, useState} from "react";
import Moralis from "moralis";
import {useAccount, useNetwork} from "wagmi";
import {truncateEthAddress} from "../../helpers/utils";
import Spinner from "../../components/Spinner";
import {useRouter} from "next/router";
import {routes} from "../../helpers/constants";

const Transactions = () => {

    const {address} = useAccount()
    const {chain} = useNetwork()

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    const fetchTransactionHistory = async () => {
        setLoading(true)
        try {
            await Moralis.start({apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY});
            const transactions = await Moralis.EvmApi.account.getTransactions({
                address,
                chain: chain?.id,
            });
            setTransactions(transactions.result)
        } catch (e) {
            console.log({e})
        } finally {
            setLoading(false)
        }

    }

    const navigateToTransferToken = () => {
        router.push("/transfer/erc")
    }

    useEffect(() => {

        if (!address) return
        fetchTransactionHistory()

    }, [address]);
    return (
        <>
            <div className="min-h-full">
                <div className="py-10">
                    <header>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h1 className="text-3xl tracking-tight font-bold leading-tight text-gray-900">Transaction
                                History</h1>
                        </div>
                    </header>
                    <main>
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            {/* Replace with your content */}
                            <div className="px-4 py-8 sm:px-0">

                                <div className="px-4 sm:px-6 lg:px-8">
                                    <div className="sm:flex sm:items-center">
                                        <div className="sm:flex-auto">
                                        </div>
                                        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                            <button
                                                type="button"
                                                onClick={navigateToTransferToken}
                                                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                            >
                                                Transfer Token
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex flex-col">
                                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                                <div
                                                    className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">

                                                    <table className="min-w-full divide-y divide-gray-300">
                                                        <thead className="bg-gray-50">
                                                        <tr>
                                                            <th scope="col"
                                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                                Transaction Hash
                                                            </th>
                                                            <th scope="col"
                                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                Currency
                                                            </th>
                                                            <th scope="col"
                                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                Contract Address
                                                            </th>
                                                            <th scope="col"
                                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                From Address
                                                            </th>
                                                            <th scope="col"
                                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                Timestamp
                                                            </th>
                                                        </tr>
                                                        </thead>


                                                        <tbody className="divide-y divide-gray-200 bg-white">
                                                        {transactions.map((txn, key) => {
                                                            txn = txn.result
                                                            return (
                                                                <tr key={key}>
                                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 hover:text-blue-600">
                                                                        <a target={"_blank"} rel={'noreferrer'}
                                                                           href={txn.chain?.explorer?.url ? `${txn.chain?.explorer?.url}/tx/${txn.hash}` : null}>{truncateEthAddress(txn.hash)}</a>
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{truncateEthAddress(txn.chain.currency?.name)}</td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hover:text-blue-600">
                                                                        <a target={"_blank"} rel={'noreferrer'}
                                                                           href={txn.chain?.explorer?.url ? `${txn.chain?.explorer?.url}/address/${txn.contractAddress?.checksum}` : null}>
                                                                            {truncateEthAddress(txn.contractAddress?.checksum)}
                                                                        </a>
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hover:text-blue-600">
                                                                        <a target={"_blank"} rel={'noreferrer'}
                                                                           href={txn.chain?.explorer?.url ? `${txn.chain?.explorer?.url}/address/${txn.from?.checksum}` : null}>{truncateEthAddress(txn.from?.checksum)}</a>
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{txn.blockTimestamp?.toDateString()}</td>

                                                                </tr>
                                                            )

                                                        })}
                                                        </tbody>
                                                    </table>
                                                    <div className={'text-center'}>
                                                        <Spinner color={"black"} loading={loading}/>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* /End replace */}
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Transactions
