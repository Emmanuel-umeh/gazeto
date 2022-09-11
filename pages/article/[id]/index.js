import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import {useContractCall} from "../../../hooks/contract/useContractCall";
import {useEffect, useState} from "react";
import Spinner from "../../../components/Spinner";
import {fetchNftMeta} from "../../../helpers/nft";
import {truncateEthAddress} from "../../../helpers/utils";
import axios from "axios";


export default function PostPage() {
  const router = useRouter();
  const id = router.query.id;
  const content2 = `
  ![](https://miro.medium.com/max/3600/1*rt-LU3OeGbaeUzMzdhsACQ.png)
  # Blockchain—the internet for cooperation

  Blockchain technology will do for cooperation what the internet did for communication.
  
  ## TLDR
  
  When people hear about Bitcoin and blockchain technology, they think about money, trading, and ubiquitous financialization. This text will argue that blockchain technology can be more than that. We will explore the revolutionary potential that an immutable public data storage that functions as a single source of truth has for human cooperation.
  
  ## Background
  
  While humans don't have any particular physical features that are superior to those of other animals, our ability to communicate and cooperate makes us as a species so unique. We are continuously augmenting these abilities even further through inventions like language, money, writing, legal systems, the printing press, stock markets, and the internet.
  
  It is hard to foresee the impact of new inventions. Few would have predicted the number of daily interactions that are now dependent on the internet thirty years ago. A hundred years ago, the internet would be unexplainable magic to most. To make the impact that we think blockchain technology will have on cooperation more tangible, we will compare it to the internet's impact on communication.
  
  ### How did the internet change how we communicate?
  
  Here are some significant changes that the internet has had on communication that can serve as a base for comparison:
  
  - **Global communication** - While a hundred years ago, global communication was sparse, today, we constantly communicate with friends and strangers all over the world.
  
  - **Communication with strangers** - In the past, we communicated mostly with people we knew; today, we discuss and share stories with strangers around the world on social networks.
  
  - **Democratization of mass communication** - Before the internet, it was hard for individuals to reach many people; few produced content for mass media. Today, communication networks make it easy for everybody to share content with a broad audience.
  
  - **Increased and fragmented communication** - We are surrounded by screens that display an endless amount of information and communicate with friends and strangers via a vast amount of short messages throughout the day.
  
  - **New mediums and forms of communication** - The internet introduced completely new communication mediums like social networks and online forums, massive multiplayer online games (MMOs), or interactive live streams. We now communicate via short messages, enriched by a new language of emojis and gifs, asynchronous voice messages, and video calls.
  `;

  const [article, setArticle] = useState(null);
  const [content, setContent] = useState("");
  const {data, isLoading, isFetched} = useContractCall("tokenURI", id, false);
  useEffect(() => {
    fetchNftData()
  }, [data]);

  const fetchNftData = async () => {
    if(!data) return
    const resp = await fetchNftMeta(data)
    setArticle(resp?.data)
  }


  // if(!isFetched || !article){
  //   return(
  //       <div className="border border-2 border-gray-300 p-4 mt-3 rounded-lg">
  //         <div className="flex">
  //           <Spinner />
  //         </div>
  //       </div>
  //       )
  // }
  // return (

  //   <div className="border border-2 border-gray-300 p-4 mt-3 rounded-lg">
  //     <div className="flex">
  //       <div className="mr-4 flex-shrink-0">
  //         <img className="h-48 w-64 object-cover rounded-lg" src={article['nms-article'][5]['enclosure-url']} alt="" />
  //       </div>
  //       <div>
  //         <h2 className="text-3xl font-bold">{article.name}</h2>
  //         <p className="mt-1 font-normal">
  //           {article.description}
  //         </p>
  //         <div className="mt-3">
  //           <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm text-gray-400 mr-3">
  //             { truncateEthAddress(article['nms-article'][3]['author'])}
  //           </span>
  //           <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm text-gray-400">
  //          { new Date(article['nms-article'][6]['pubDate']).toDateString()}
  //           </span>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  console.log({article})

  useEffect(() => {
    getMarkdown()
  }, [article])

  const getMarkdown = async () => {
    try{
      if(!article || !article['nms-article']) return
    const textToMarkdown = article['nms-article'][1]['link']
    console.log({textToMarkdown});
    if (!textToMarkdown) {
      console.log("false");
      return
    }
    const {data} = await axios.get(textToMarkdown.imageUrl)
    console.log("this us the content ",  data)
    setContent(data.toString())
    }
    catch(e){
      console.log({e})

    }
  }

  if(!article){
    return <></>
  }
  return (
    <>
    <div className="relative bg-white py-16">
      <div className="hidden lg:absolute lg:block lg:h-full lg:w-full">
        <div className="relative mx-auto h-full max-w-prose text-lg" aria-hidden="true">
        <figure>
            <img
              className="w-full rounded-lg"
              src={article['nms-article'][5]['enclosure-url']}
              alt=""
              width={1310}
              height={873}
            />
          </figure>
          <div className="prose">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
