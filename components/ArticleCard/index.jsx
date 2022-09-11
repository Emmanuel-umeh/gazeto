import {useContractCall} from "../../hooks/contract/useContractCall";
import {useEffect, useState} from "react";
import Spinner from "../Spinner";
import {fetchNftMeta} from "../../helpers/nft";
import {truncateEthAddress} from "../../helpers/utils";
import {useRouter} from "next/router";

const ArticleCard = ({ id }) => {
  const [article, setArticle] = useState(null);
  const {data, isLoading, isFetched} = useContractCall("tokenURI", [id.toString()], false);
  useEffect(() => {
    fetchNftData()
  }, [data]);
  const router = useRouter()

  const fetchNftData = async () => {
    if(!data) return
    const resp = await fetchNftMeta(data)
    setArticle(resp?.data)
  }


  if(!isFetched || !article){
    return(
        <div className="border border-2 border-gray-300 p-4 mt-3 rounded-lg">
          <div className="flex">
            <Spinner />
          </div>
        </div>
        )
  }

  const metadata = article ?  article['ms-article'] : null
  return (

    <div className="border border-2 border-gray-300 p-4 mt-3 rounded-lg cursor-pointer" onClick={() => {
      router.push(`article/${id}`)
    }}>
      <div className="flex">
        <div className="mr-4 flex-shrink-0">
          <img className="h-48 w-64 object-cover rounded-lg" src={article['nms-article'][5]['enclosure-url']} alt="" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">{article.name}</h2>
          <p className="mt-1 font-normal">
            {article.description}
          </p>
          <div className="mt-3">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm text-gray-400 mr-3">
              { truncateEthAddress(article['nms-article'][3]['author'])}
            </span>
            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm text-gray-400">
           { new Date(article['nms-article'][6]['pubDate']).toDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard;
