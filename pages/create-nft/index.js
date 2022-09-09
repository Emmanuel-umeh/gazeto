import {useState} from "react";
import {useAccount, useBalance, useNetwork} from "wagmi";
import {uploadFileToWebStorage} from "../../helpers/nft";

const MintNft = () => {
    const [ipfsImage, setIpfsImage] = useState("");
    const [nftName, setNftName] = useState("");
    const [nftDescription, setNftDescription] = useState("");
    const {address} = useAccount()
    const {chain} =  useNetwork()

    // check if all form data has been filled
    const isFormFilled = () =>
        nftName && ipfsImage && nftDescription

    const createNft = async (
        {name, description, ipfsImage, ownerAddress}
    ) => {
            if (!name || !description || !ipfsImage) return;
            // convert NFT metadata to JSON format
            const data = JSON.stringify({
                name,
                description,
                image: ipfsImage,
                owner: address,
            });

            try {

                // save NFT metadata to IPFS
                // const added = await client.add(data);
                //
                // // IPFS url for uploaded metadata
                // const url = `https://ipfs.infura.io/ipfs/${added.path}`;
                //
                // // mint the NFT and save the IPFS url to the blockchain
                // let transaction = await minterContract.methods
                //     .safeMint(ownerAddress, url)
                //     .send({from: defaultAccount});
                //
                // return transaction;
            } catch (error) {
                console.log("Error uploading file: ", error);
            }
    };

    return (
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow shadow-2xl sm:rounded-lg sm:px-10">
                    <p className={"text-3xl mb-4"}>Create NFT</p>
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                                Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="text"
                                    name="name"
                                    type="text"
                                    onChange={(e) => {
                                        setNftName(e.target.value)
                                    }}
                                    autoComplete="name"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-2 border-black rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                                Description
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="text"
                                    name="text"
                                    onChange={(e) => {
                                        setNftDescription(e.target.value)
                                    }}
                                    rows={5}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-2 border-black rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>



                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                                Attach file
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="text"
                                    name="text"
                                    rows={5}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-2 border-black rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700">
                                Cover photo
                            </label>
                            {ipfsImage && (
                                <div>
                                    <img src={ipfsImage} alt="cover" />
                                </div>
                            )}
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                                        >

                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                onChange={ async (e)=>{
                                                    const imageUrl = await uploadFileToWebStorage(e)
                                                    if (!imageUrl) {
                                                        alert("failed to upload image");
                                                        return;
                                                    }
                                                    setIpfsImage(imageUrl);
                                                }}
                                            />
                                        </label>
                                        <p className="pl-1">attach your file here</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-black hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-gray-400"
                            >
                                Mint {chain?.name ? 'on '+ chain.name : ''}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default MintNft;
