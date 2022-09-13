import { useRouter } from "next/router";
import { useEffect, useState } from 'react';

const SearchBar = () => {
  const router = useRouter();
  const [searchAddress, setSearchAddress] = useState(null);

  const searchUserNft = (e) => {
    e.preventDefault();
    if (!searchAddress) {
      alert("Enter valid address");
    } else {
      router.push(`/nft-explorer/${searchAddress}`);
    }
    //  Todo, refactor into paths
  };

  return (
    <div className="mt-10 sm:mt-12">
      <form className="sm:max-w-xl sm:mx-auto lg:mx-0">
        <div className="sm:flex">
          <div className="min-w-0 flex-1">
            <input
              id="text"
              type="text"
              onInput={e => setSearchAddress(e.target.value)}
              placeholder="Type address address and search NFTs"
              className="block w-full px-4 py-3 rounded-md border-2 border-gray-300 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
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
  );
};

export default SearchBar;
