const NftExplorer = () => {

    return(
        <div>
            <main className="min-h-full flex-col text-center items-center justify-center  mt-20 max-w-3xl mx-auto sm:px-6 lg:px-8">
                <div className="mt-10 sm:mt-12">
                    <form action="#" className="sm:max-w-xl sm:mx-auto lg:mx-0">
                        <div className="sm:flex">
                            <div className="min-w-0 flex-1">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Type address address and search NFTs"
                                    className="block w-full px-4 py-3 rounded-md border-2 border-black text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                                />
                            </div>
                            <div className="mt-3 sm:mt-0 sm:ml-3">
                                <button
                                    type="submit"
                                    className="block w-full py-3 px-4 rounded-md shadow bg-gray-600 from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                                >
                                    Create NFT
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className={"flex flex-col items-center "}>
                    <img className={"rounded-full w-20 h-20 mt-10"} src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt=""/>
                    <p>user info(ENS NAME, AVATAR)</p>
                </div>


                <div className="mt-10 sm:mt-12 grid grid-cols-4 gap-4">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="border border-2 border-black">

                            <div className={"border-2 border-black m-3 h-full"}>
                                <img className={"h-32"} src={"https://nationaltoday.com/wp-content/uploads/2022/05/63-Superman-Day.jpg"} alt={"img"}  />
                            </div>

                            <h3 className="text-left pl-3 text-lg font-medium text-gray-900">
                                Superman
                            </h3>
                            <p className=" text-left pl-3 text-sm font-medium text-gray-600">
                                Price: 0.05eth
                            </p>

                        </div>
                        </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="border border-2 border-black">

                            <div className={"border-2 border-black m-3 h-32"}>
                                <img className={"h-32"} src={"https://nationaltoday.com/wp-content/uploads/2022/05/63-Superman-Day.jpg"} alt={"img"}  />
                            </div>

                            <h3 className="text-left pl-3 text-lg font-medium text-gray-900">
                                Superman
                            </h3>
                            <p className=" text-left pl-3 text-sm font-medium text-gray-600">
                                Price: 0.05eth
                            </p>

                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="border border-2 border-black">

                            <div className={"border-2 border-black m-3 h-32"}>
                                <img className={"h-32"} src={"https://nationaltoday.com/wp-content/uploads/2022/05/63-Superman-Day.jpg"} alt={"img"}  />
                            </div>

                            <h3 className="text-left pl-3 text-lg font-medium text-gray-900">
                                Superman
                            </h3>
                            <p className=" text-left pl-3 text-sm font-medium text-gray-600">
                                Price: 0.05eth
                            </p>

                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="border border-2 border-black">

                            <div className={"border-2 border-black m-3 h-32"}>
                                <img className={"h-32"} src={"https://nationaltoday.com/wp-content/uploads/2022/05/63-Superman-Day.jpg"} alt={"img"}  />
                            </div>

                            <h3 className="text-left pl-3 text-lg font-medium text-gray-900">
                                Superman
                            </h3>
                            <p className=" text-left pl-3 text-sm font-medium text-gray-600">
                                Price: 0.05eth
                            </p>

                        </div>
                    </div>


                </div>

            </main>
        </div>
    )
}
export default NftExplorer;
