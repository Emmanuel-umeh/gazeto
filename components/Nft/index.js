import {truncateEthAddress} from "../../helpers/utils";
import {useRouter} from "next/router";

const NftCard = ({nft, key}) => {
const router = useRouter()
    if(!nft) return
    return(
        <div key={key}
             className="flex flex-col sm:flex-row sm:items-center sm:justify-between cursor-pointer" onClick={()=>{
                 router.push(`/article/${nft.tokenId}`)
        }}>
            <div className="border border-2 border-black">

                <div className={"border-2 border-black m-3 h-full"}>
                    <img className={"h-32"}
                         src={nft.metadata?.image || "https://nationaltoday.com/wp-content/uploads/2022/05/63-Superman-Day.jpg"}
                         alt={"img"}/>
                </div>

                <h3 className="text-left pl-3 text-lg font-medium text-gray-900">
                    {nft.metadata?.name }
                </h3>
                <p className=" text-left pl-3 text-sm font-medium text-gray-600">
                    amount: {nft.amount}
                </p>
                <p className=" text-left pl-3 text-sm font-medium text-gray-600">
                    address: {truncateEthAddress(nft.ownerOf.checksum)}
                </p>

            </div>
        </div>

    )
}

export default NftCard
