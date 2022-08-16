
const Counter = () => {
    return (
        <div >
            <main className="min-h-full flex-col text-center justify-center border border-black border-2 mt-20 max-w-lg mx-auto sm:px-6 lg:px-8">
                <div>
                    <p className={"text-3xl mt-3"}> Counter </p>
                </div>

                <div className={"flex justify-center mt-3"}>
                    <div className={"border border-black w-32 p-5 "}>
                        <p>Count</p>
                        <p className={"text-6xl"}>30</p>

                    </div>

                </div>

                <div className="flex-row justify-center items-center mt-5 space-x-5 mb-5">
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="inline-flex items-center  px-8 py-4 border border-transparent text-xl leading-4 font-medium rounded-md shadow-sm text-dark border border-2 border-black bg-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    Decrease
                    </button>

                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="inline-flex items-center px-8 py-4 border border-transparent text-xl leading-4 font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Increase
                    </button>
                </div>


            </main>

        </div>
    )
}

export default Counter;
