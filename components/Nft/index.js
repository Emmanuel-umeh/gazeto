const NftCard = ({nft, key}) => {
    return(
        <div key={key}
             className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="border border-2 border-black">

                <div className={"border-2 border-black m-3 h-full"}>
                    <img className={"h-32"}
                         src={nft.logo || "https://nationaltoday.com/wp-content/uploads/2022/05/63-Superman-Day.jpg"}
                         alt={"img"}/>
                </div>

                <h3 className="text-left pl-3 text-lg font-medium text-gray-900">
                    {nft.name}
                </h3>
                <p className=" text-left pl-3 text-sm font-medium text-gray-600">
                    amount: {nft.amount}
                </p>
                <p className=" text-left pl-3 text-sm font-medium text-gray-600">
                    address: {nft.token_address}
                </p>

            </div>
        </div>

    )
}

export default NftCard
