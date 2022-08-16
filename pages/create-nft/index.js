
const MintNft = () => {
    return (
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow shadow-2xl sm:rounded-lg sm:px-10">
                    <p className={"text-3xl mb-4"}>Create NFT(ERC1155)</p>
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                                Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
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

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-black hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-gray-400"
                            >
                                Mint On Rinkeby
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default MintNft;
