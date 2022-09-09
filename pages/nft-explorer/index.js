import {useNFTBalances} from "react-moralis";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Moralis from "moralis";
import {useAccount, useEnsName, useNetwork} from "wagmi";
import NftCard from "../../components/Nft";
import UserInfo from "../../components/Nft/userInfo";

const NftExplorer = () => {
    const {address} = useAccount();
    const router = useRouter()

    const [nftBalances, setNftBalances] = useState([]);
    const {data: ensName} = useEnsName({address})

    const {chain} = useNetwork()

    const [searchAddress, setSearchAddress] = useState(null);

    const searchUserNft = () => {
        if (!searchAddress) alert("Enter valid address")
        //  Todo, refactor into paths
        router.push(`/nft-explorer/${searchAddress}`)
    }

    const fetchNfts = async () => {
        try {
            await Moralis.start({apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY});

            const balances = await Moralis.EvmApi.account.getNFTs({
                address: address,
                chain: chain.id
            });
            setNftBalances(balances?.result)
        } catch (e) {
            console.log({e})
        }
    }

    useEffect(() => {
        if (!address) return
        fetchNfts()

    }, []);


    return (
        <div>
            <main
                className="min-h-full flex-col text-center items-center justify-center  mt-20 max-w-3xl mx-auto sm:px-6 lg:px-8">
                <div className="mt-10 sm:mt-12">
                    <form action="#" className="sm:max-w-xl sm:mx-auto lg:mx-0">
                        <div className="sm:flex">
                            <div className="min-w-0 flex-1">
                                <input
                                    id="text"
                                    type="text"
                                    onChange={(e) => {
                                        setSearchAddress(e.target.value)
                                    }}
                                    placeholder="Type address address and search NFTs"
                                    className="block w-full px-4 py-3 rounded-md border-2 border-black text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                                />
                            </div>
                            <div className="mt-3 sm:mt-0 sm:ml-3">
                                <button
                                    onClick={searchUserNft}
                                    className="block w-full py-3 px-4 rounded-md shadow bg-gray-600 from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                                >
                                    Search NFT
                                </button>
                            </div>
                        </div>
                    </form>
                </div>


                {nftBalances.length ?
                    <>

                      <UserInfo address={address} />


                        <div className={'flex flex-row space-x-5 mt-10 sm:mt-12'}>
                            <p className={"text-3xl"}>NFTs</p>
                            <div className={'bg-gray-100 rounded -mt-1'}>
                                <p className={"text-md p-2"}>{chain.name}</p>
                            </div>

                        </div>

                        <div className="mt-10 sm:mt-12 grid grid-cols-4 gap-4">

                            {nftBalances.map((nft, index) => {
                                return (
                                    <NftCard nft={nft} key={index}/>
                                )
                            })}

                        </div>
                    </>
                     :
                    <div>
                        <h1 className={'p-20'}>No NFTs available</h1>
                    </div>
                }

            </main>
        </div>
    )
}
export default NftExplorer;