function Article({ article }) {
    return (
        <div className='bg-white flex border-2 border-neutral-400/20 rounded-xl p-2 px-4'>
            {/* <div className='aspect-square w-20 flex-none'>
                <img src="https://images.unsplash.com/photo-1623151990003-8b2b2f2b2f1d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="" />
            </div> */}
            <div className='grow space-y-2 truncate'>
                <h2 className='text-base font-bold truncate'>
                    {article.title}
                </h2>
                <p className='text-sm font-light truncate'>
                    {article.source}
                </p>
                <div className='text-xs font-light flex justify-between'>
                    <i>
                        {article.published_at}
                    </i>
                    <a className="flex items-center space-x-1" href={article.url} target="_blank">
                        read more
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}


export default Article;