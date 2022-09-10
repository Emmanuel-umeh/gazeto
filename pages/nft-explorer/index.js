import { useNFTBalances } from 'react-moralis';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Moralis from 'moralis';
import { useAccount, useEnsName, useNetwork } from 'wagmi';
import NftCard from '../../components/Nft';
import UserInfo from '../../components/Nft/userInfo';
import ArticleCard from '../../components/ArticleCard';

const articles = [
  {
    title: 'Tezos: Web3’s Gritty Underground Art Scene',
    description:
      'Underneath the noise of conspicuous digital consumerism, though, lies a dark, growing...',
    cover:
      'https://s32659.pcdn.co/wp-content/uploads/2021/12/nft-free.jpg.optimal.jpg',
    authorAddress: '0x903lkdkj..ab2',
    publishedAt: 'August 25th, 2022',
  },
  {
    title: 'Is NFT Star Daniel Allan Web3’s First Breakout Music...',
    description:
      'Fourteen-hour days on Discord, failures and massive risks: what it takes to be successful in Web3.',
    cover:
      'https://cdn.pixabay.com/photo/2022/03/01/02/51/galaxy-7040416__480.png',
    authorAddress: '0x903lkdkj..ab2',
    publishedAt: 'August 17th, 2022',
  },
  {
    title: 'Music NFTs Breakout Moment?',
    description:
      'Anyone who’s been involved in the web3 space for the past 18 months has heard that music NFTs are going to take over',
    cover:
      'https://i.imgur.com/aUlCoR2.jpeg',
    authorAddress: '0x903lkdkj..ab2',
    publishedAt: 'June 30th, 2022',
  },
];

const NftExplorer = () => {
  const { address } = useAccount();
  const router = useRouter();

  const [nftBalances, setNftBalances] = useState([]);
  const { data: ensName } = useEnsName({ address });

  const { chain } = useNetwork();

  const [searchAddress, setSearchAddress] = useState(null);

  const searchUserNft = () => {
    if (!searchAddress) alert('Enter valid address');
    //  Todo, refactor into paths
    router.push(`/nft-explorer/${searchAddress}`);
  };

  const fetchNfts = async () => {
    try {
      await Moralis.start({ apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY });

      const balances = await Moralis.EvmApi.account.getNFTs({
        address: address,
        chain: chain.id,
      });
      setNftBalances(balances?.result);
    } catch (e) {
      console.log({ e });
    }
  };

  useEffect(() => {
    if (!address) return;
    fetchNfts();
  }, []);

  return (
    <div>
      <main className='min-h-full flex-col  items-center justify-center  mt-20 max-w-3xl mx-auto sm:px-6 lg:px-8'>
        <div className='mt-10 sm:mt-12'>
          <form action='#' className='sm:max-w-xl sm:mx-auto lg:mx-0'>
            <div className='sm:flex'>
              <div className='min-w-0 flex-1'>
                <input
                  id='text'
                  type='text'
                  onChange={(e) => {
                    setSearchAddress(e.target.value);
                  }}
                  placeholder='Type address address and search NFTs'
                  className='block w-full px-4 py-3 rounded-md border-2 border-gray-300 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900'
                />
              </div>
              <div className='mt-3 sm:mt-0 sm:ml-3'>
                <button
                  onClick={searchUserNft}
                  className='block w-full py-3 px-4 rounded-md shadow bg-gray-600 from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900'
                >
                  Search NFT
                </button>
              </div>
            </div>
          </form>
        </div>

        {nftBalances.length ? (
          <>
            <UserInfo address={address} />

            <div className={'flex flex-row space-x-5 mt-10 sm:mt-12'}>
              <p className={'text-3xl'}>NFTs</p>
              <div className={'bg-gray-100 rounded -mt-1'}>
                <p className={'text-md p-2'}>{chain.name}</p>
              </div>
            </div>

            <div className='mt-10 sm:mt-12 grid grid-cols-4 gap-4'>
              {nftBalances.map((nft, index) => {
                return <NftCard nft={nft} key={index} />;
              })}
            </div>
          </>
        ) : (
          <div>
            <h1 className={'p-20 text-center'}>No NFTs available</h1>
            <div className=''>
              {articles.map((article) => (
                <ArticleCard article={article} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
export default NftExplorer;
