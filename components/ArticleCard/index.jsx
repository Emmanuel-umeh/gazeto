const ArticleCard = ({ article }) => {
  return (

    <div className="border border-2 border-gray-300 p-4 mt-3 rounded-lg">
      <div className="flex">
        <div className="mr-4 flex-shrink-0">
          <img className="h-48 w-64 object-cover rounded-lg" src={article.cover} alt="" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">{article.title}</h2>
          <p className="mt-1 font-normal">
            {article.description}
          </p>
          <div className="mt-3">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm text-gray-400 mr-3">
              {article.authorAddress}
            </span>
            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm text-gray-400">
              {article.publishedAt}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard;