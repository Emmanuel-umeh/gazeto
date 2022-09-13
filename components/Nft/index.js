import {truncateEthAddress} from "../../helpers/utils";
import {useRouter} from "next/router";

const NftCard = ({nft, key}) => {
const router = useRouter()
    if(!nft) return
    return(
        <div className="border border-2 border-gray-300 p-4 mt-3 rounded-lg cursor-pointer" onClick={() => {
            router.push(`/article/${nft.tokenId}`)
        }}>
            <div className="flex">
                <div className="mr-4 flex-shrink-0">
                    <img className="h-48 w-64 object-cover rounded-lg"
                         src={nft.metadata?.image || "https://nationaltoday.com/wp-content/uploads/2022/05/63-Superman-Day.jpg"}
                        alt={'img'}
                    />
                </div>
                <div>
                    <h2 className="text-3xl font-bold">{nft.metadata?.name }</h2>
                    <p className="mt-1 font-normal">
                        {nft.metadata.description}
                    </p>
                    <div className="mt-3">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm text-gray-400 mr-3">
            address: {truncateEthAddress(nft.ownerOf.checksum)}
            </span>
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm text-gray-400">
           {/*{ new Date(article['nms-article'][6]['pubDate']).toDateString()}*/}
                            date: {truncateEthAddress(nft.ownerOf.checksum)}
            </span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default NftCard
