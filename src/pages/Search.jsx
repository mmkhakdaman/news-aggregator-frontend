import React, { useMemo, useState } from 'react';
import Article from '../components/Article';
import Select from 'react-select'
import api from '../utils/api';
import Loading from '../components/Loading';


const Search = () => {

  const [keyword, setKeyword] = useState('');
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    // call the backend API to retrieve articles based on selected filters
    setIsLoading(true);
    api.get('/api/search', {
      params: {
        q: keyword,
      }
    })
      .then(response => {
        setArticles(response.data);
        setIsSearched(true);
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }



  const filterdArticles = useMemo(() => {
    let filteredArticles = articles;

    if (categories.length > 0) {
      filteredArticles = filteredArticles.filter(article => categories.includes(article.category));
    }

    if (sources.length > 0) {
      filteredArticles = filteredArticles.filter(article => sources.includes(article.source));
    }

    if (fromDate) {
      filteredArticles = filteredArticles.filter(article => new Date(article.published_at) >= new Date(fromDate));
    }

    if (toDate) {
      filteredArticles = filteredArticles.filter(article => new Date(article.published_at) <= new Date(toDate));
    }

    return filteredArticles;
  }, [
    categories,
    sources,
    fromDate,
    toDate,
    articles
  ])


  return (
    <div className='text-neutral-700 m-6 flex flex-col'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-light'>
          News Search
        </h1>
      </div>
      <div>
        <form onSubmit={handleSearch} className='mt-4 bg-white p-4 rounded-xl border-2 border-neutral-400/20'>
          <div className='space-y-1'>
            <label htmlFor="keyword" className='text-neutral-400 font-light text-sm'>
              Keyword
            </label>
            <input type="text" className='border-2 border-neutral-400/20 rounded-lg w-full p-1' value={keyword} onChange={event => setKeyword(event.target.value)} />
          </div>
          <div className='flex space-x-2'>
            <button className='mt-2 bg-blue-500 px-2 py-1 text-white rounded-xl'>
              Search
            </button>
          </div>
        </form>
      </div>
      {
        isLoading ? (

          <div className='mt-4 flex space-x-2 items-center justify-center'>
            <Loading />
          </div>

        ) : (
          <>

            {
              articles.length > 0 && (

                <div className='mt-4 bg-white p-4 rounded-xl border-2 border-neutral-400/20'>
                  <p>
                    Filter The Results
                  </p>
                  <div className='mt-4 space-y-2 '>
                    <div className='space-y-1'>
                      <label htmlFor="category" className='text-neutral-400 font-light text-sm'>
                        Category
                      </label>

                      <Select
                        isMulti
                        onChange={(e) => setCategories(e.map(option => option.value))}
                        options={
                          [...new Set(articles.map(article => article.category))].map((category, index) => (
                            { value: category, label: category }
                          ))
                        }
                      >
                      </Select>
                    </div>
                    <div className='space-y-1'>
                      <label htmlFor="source" className='text-neutral-400 font-light text-sm'>
                        Source
                      </label>
                      <Select
                        isMulti
                        onChange={(e) => setSources(e.map(option => option.value))}
                        options={
                          [...new Set(articles.map(article => article.source))].map((source, index) => (
                            { value: source, label: source }
                          ))
                        }
                      >
                      </Select>
                    </div>
                    <div className="flex space-x-2">
                      <div className='space-y-1 w-full'>
                        <label htmlFor="fromDate" className='text-neutral-400 font-light text-sm'>
                          From Date
                        </label>
                        <input type="date" className='border-2 border-neutral-400/20 rounded-lg w-full p-1' value={fromDate} onChange={event => setFromDate(event.target.value)} />
                      </div>
                      <div className='space-y-1 w-full'>
                        <label htmlFor="toDate" className='text-neutral-400 font-light text-sm'>
                          To Date
                        </label>
                        <input type="date" className='border-2 border-neutral-400/20 rounded-lg w-full p-1' value={toDate} onChange={event => setToDate(event.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            }

            <div className='mt-4 space-y-4'>
              {
                filterdArticles.length === 0 && isSearched ? (
                  <div className='bg-white p-4 rounded-xl border-2 border-neutral-400/20'>
                    <p className='text-center'>

                      No Articles Found
                    </p>
                  </div>
                )
                  : filterdArticles.length > 0 && (
                    <>
                      <div className='flex justify-between items-center'>
                        <p className='text-xl font-light'>
                          Results
                        </p>

                        <p className='text-sm font-light text-neutral-400'>
                          {filterdArticles.length} articles found
                        </p>
                      </div>

                      <div className="space-y-4">
                        {filterdArticles.map((article, index) => (
                          <Article key={index} article={article} />
                        ))}
                      </div>
                    </>
                  )
              }
            </div>
          </>
        )
      }
    </div>
  );
};

export default Search;
