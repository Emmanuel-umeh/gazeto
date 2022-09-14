import { useEffect, useState } from 'react';
import { useAccount, useBalance, useNetwork } from 'wagmi';
import Head from 'next/head';
import {
  uploadFileToWebStorage,
  uploadContentToWeb3Storage,
  uploadMarkdownToWebStorage,
} from '../../helpers/nft';
import { useContractSend } from '../../hooks/contract/useContractWrite';
import Spinner from '../../components/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import ConnectWallet from '../../components/ConnectWallet';
import { useRouter } from 'next/router';

const MintNft = () => {
  const [ipfsImage, setIpfsImage] = useState({
    imageUrl: null,
    imageSize: null,
    imageType: null,
  });
  const [nftName, setNftName] = useState('');
  const [nftDescription, setNftDescription] = useState('');
  const [nftContent, setNftContent] = useState('');
  const [nftCategory, setNftCategory] = useState('');
  const [metadataUrl, setMetadataUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [connectWallet, setConnectWallet] = useState(false);

  const { address } = useAccount();
  const { chain } = useNetwork();
  const router = useRouter();

  const {
    writeAsync: mintNft,
    isSuccess: mintSuccess,
    isLoading: mintLoading,
  } = useContractSend('safeMint', [address, metadataUrl?.imageUrl]);

  useEffect(() => {
    if (mintNft) {
      mint();
    }
  }, [mintNft]);

  const mint = async () => {
    try {
      setLoading(true);
      await mintNft();
      toast.success('Article created successfully!!', {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push('nft-explorer');
      }, 1500);
    } catch (e) {
      console.log({ e });
      toast.warn('Something went wrong. Please try again.', {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  // check if all form data has been filled
  const isFormFilled = () =>
    nftName && ipfsImage.imageUrl && nftDescription && mintNft;

  const createNft = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (!address) {
        setConnectWallet(true);
      }
      const { imageUrl, imageSize, imageType } = ipfsImage;
      if (
        !nftName ||
        !nftDescription ||
        !ipfsImage.imageUrl ||
        !nftCategory ||
        !nftContent
      )
        return;

      const ipfsArticleContent = await uploadMarkdownToWebStorage(nftContent);
      // convert NFT metadata to JSON format
      const data = {
        name: nftName,
        description: nftDescription,
        image: imageUrl,
        'nms-article': [
          { title: nftName },
          { link: ipfsArticleContent },
          { description: nftDescription },
          { author: address },
          { category: nftCategory },
          { 'enclosure-url': imageUrl, length: imageSize, type: imageType },
          { pubDate: new Date() },
          { blockchain: chain?.name },
          { guid: 'xyz' },
          { editions: '1' },
          { edition: '1' },
        ],
      };
      const metadataUrl = await uploadContentToWeb3Storage(data);
      setMetadataUrl(metadataUrl);
    } catch (error) {
      console.log('Error minting nft', error);
      toast.warn('Something went wrong. Please try again.', {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Write an article | Gazeto</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='flex flex-col justify-center py-12 mb-18'>
        <ToastContainer />
        <ConnectWallet autoPopup={connectWallet} isMintNft={true} />
        <div className='mt-2 sm:mx-auto sm:w-full sm:max-w-md lg:max-w-3xl mx-auto'>
          <div className='bg-white border border-2 border-gray-200 py-8 px-4 sm:rounded-lg'>
            <p className={'text-3xl font- mb-4'}>Write article</p>
            <form className='space-y-6' action='#' method='POST'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-lg font-medium text-gray-700 sr-only'
                >
                  Title
                </label>
                <div className='mt-1'>
                  <input
                    id='text'
                    name='name'
                    type='text'
                    onChange={(e) => {
                      setNftName(e.target.value);
                    }}
                    autoComplete='name'
                    placeholder='Type type...'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-lg font-medium text-gray-700 sr-only'
                >
                  Short Description
                </label>
                <div className='mt-1'>
                  <input
                    id='text'
                    name='name'
                    type='text'
                    onChange={(e) => {
                      setNftDescription(e.target.value);
                    }}
                    autoComplete='name'
                    placeholder='Description'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              {/*<div>*/}
              {/*    <label htmlFor="email" className="block text-lg font-medium text-gray-700">*/}
              {/*        Write article content*/}
              {/*    </label>*/}
              {/*    <div className="mt-1">*/}
              {/*        <textarea*/}
              {/*            id="text"*/}
              {/*            name="text"*/}
              {/*            onChange={(e) => {*/}
              {/*                setNftContent(e.target.value)*/}
              {/*            }}*/}
              {/*            rows={5}*/}
              {/*            required*/}
              {/*            className="appearance-none block w-full px-3 py-2 border border-2 border-black rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"*/}
              {/*        />*/}
              {/*    </div>*/}
              {/*</div>*/}

              <div>
                <label
                  htmlFor='email'
                  className='block text-lg font-medium text-gray-700 sr-only'
                >
                  Write article content
                </label>
                <div className='mt-1'>
                  <textarea
                    id='text'
                    name='text'
                    onChange={(e) => {
                      setNftContent(e.target.value);
                    }}
                    placeholder='Write article content...'
                    rows={7}
                    required
                    className='appearance-none block w-full px-3 py-2 border border-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block text-lg font-medium text-gray-700 sr-only'
                >
                  Categories
                </label>
                <div className='mt-1'>
                  <input
                    id='text'
                    name='name'
                    type='text'
                    onChange={(e) => {
                      setNftCategory(e.target.value);
                    }}
                    autoComplete='name'
                    placeholder='Category'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div className='mt-6'>
                <label className='block text-sm font-medium text-gray-500'>
                  Cover photo (Maximum 500kb)
                </label>
                {ipfsImage?.imageUrl && (
                  <div className={'flex flex-row justify-center'}>
                    <img src={ipfsImage.imageUrl} alt='cover' />
                  </div>
                )}
                <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>

                  <div className='space-y-1 text-center'>
                    <svg
                      className='mx-auto h-12 w-12 text-gray-400'
                      stroke='currentColor'
                      fill='none'
                      viewBox='0 0 48 48'
                      aria-hidden='true'
                    >
                      <path
                        d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>

                    <div className='flex text-sm text-gray-600'>
                      <label
                        htmlFor='file-upload'
                        className='relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500'
                      >
                        <input
                          id='file-upload'
                          name='file-upload'
                          type='file'
                          onChange={async (e) => {
                            console.log({e})
                            const { imageUrl, imageSize, imageType } =
                              await uploadFileToWebStorage(e.target.files);
                            console.log({imageUrl, imageSize, imageType})
                            if (!imageUrl) {
                              alert('failed to upload image');
                              return;
                            }
                            setIpfsImage({
                              imageUrl,
                              imageSize,
                              imageType,
                            });
                          }}
                        />
                      </label>
                      {/*<p className="pl-1">attach your file here</p>*/}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button
                  disabled={!isFormFilled}
                  onClick={createNft}
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-gray-400 disabled:bg-gray-400'
                >
                  {loading ? <Spinner /> : 'Save and mint article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MintNft;
