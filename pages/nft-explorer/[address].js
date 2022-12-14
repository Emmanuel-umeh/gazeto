import { useRouter } from "next/router";
import Moralis from "moralis";
import { useEffect, useState } from "react";
import { useEnsAvatar, useEnsName, useNetwork } from "wagmi";
import NftCard from "../../components/Nft";
import UserInfo from "../../components/Nft/userInfo";
import SearchBar from '../../components/SearchBar';
import Spinner from "../../components/Spinner";

const SingleNft = () => {
  const { query } = useRouter();
  const { address } = query;

  const { chain } = useNetwork();

  const [nftBalances, setNftBalances] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchNfts = async () => {
    try {
      setIsLoading(true)
      await Moralis.start({ apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY });

      const balances = await Moralis.EvmApi.account.getNFTs({
        address: address,
        chain: chain?.id || '0x13881',
      });
      const results  = balances?.result?.filter((nft)=>{
        return typeof nft.result?.metadata?.['nms-article'] === 'object'
      })
      setNftBalances(results);
    } catch (e) {
      console.log({ e });
    }finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (!address) return;
    fetchNfts();
  }, [address]);

  return (
    <div>
      <main className="min-h-full flex-col text-center items-center justify-center mt-20 max-w-3xl mx-auto sm:px-6 lg:px-8">
        <SearchBar />
        <UserInfo address={address} />

        {nftBalances.length ? (
          <>
            <div className={"flex flex-row space-x-5 mt-10 sm:mt-12"}>
              <p className={"text-3xl"}>NFTs</p>
              <div className={"bg-gray-100 rounded -mt-1"}>
                <p className={"text-md p-2"}>Polygon Blockchain</p>
              </div>
            </div>

            <div>
              {nftBalances.map((nft, index) => {
                nft = nft.result;
                return <NftCard nft={nft} key={index} />;
              })}
            </div>
          </>
        ) : isLoading ?
            <div className="p-4 mt-3 rounded-lg mt-40">
              <div className="flex justify-center align-center">
                <Spinner size={'10vw'} color={'black'} loading={true} />
              </div>
            </div> :
              <div>
                <h1 className={"p-20"}>No NFTs available</h1>
              </div>


        }
      </main>
    </div>
  );
};
export default SingleNft;
