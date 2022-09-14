import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const SearchBar = () => {
  const router = useRouter();
  const [searchAddress, setSearchAddress] = useState(null);

  const searchUserNft = (e) => {
    e.preventDefault();
    if (!searchAddress) {
      alert('Enter valid address');
    } else {
      router.push(`/nft-explorer/${searchAddress}`);
    }
    //  Todo, refactor into paths
  };

  return (
    <>
      <div className='mt-10 sm:mt-6'>
        <form className='w-full rounded-md border-2 border-gray-300 py-2 px-2'>
          <div className='sm:flex'>
            <div className='min-w-0 flex-1'>
              <input
                id='text'
                type='text'
                onInput={(e) => setSearchAddress(e.target.value)}
                placeholder='Type address and search articles...'
                className='block w-full px-2 py-2 rounded-md border-none text-gray-900 placeholder-gray-400 focus:outline-none'
              />
            </div>
            <div className='mt-3 sm:mt-0 sm:ml-3'>
              <button
                onClick={searchUserNft}
                className='block w-full px-6 py-2 font-medium rounded-md bg-indigo-600 from-indigo-500 to-indigo-600 text-white hover:from-teal-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 focus:ring-offset-gray-900'
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
