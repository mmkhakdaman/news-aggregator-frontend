import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, logout, setUser } from '../app/stores/auth';
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { feed } from '../api/feed';
import Article from '../components/article';
import Select from 'react-select';

const Feed = () => {

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);

  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [authors, setAuthors] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [selectedSources, setSelectedSources] = useState(
    user?.preferences.sources ?? []
  );
  const [selectedCategories, setSelectedCategories] = useState(
    user?.preferences.categories ?? []
  );
  // const [selectedAuthors, setSelectedAuthors] = useState(
  //   user.preferences.authors
  // );

  // set sources
  useEffect(() => {
    setIsLoading(true);
    feed.getFeed(page).then(response => {
      setArticles(response.data);
      setIsLoading(false);
    });

    feed.getSources().then(response => {
      setSources(response.data);
    });

    feed.getCategories().then(response => {
      setCategories(response.data);
      console.log(categories.filter(category => user.preferences?.categories.includes(category.id)).map(category => ({ value: category.id, label: category.name })))
    });

    // feed.getAuthors().then(response => {
    //   setAuthors(response.data);
    // });

  }, []);

  const handleFilter = (event) => {
    event.preventDefault();
    // call the backend API to retrieve articles based on selected filters
    setIsLoading(true);

    api.post('/api/feed', {
      sources: selectedSources,
      categories: selectedCategories,
      // authors: selectedAuthors
    })
      .then(async response => {
        dispatch(setUser(response.data));

        await feed.getFeed().then(response => {
          setArticles(response.data);
        });
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }

  const loadMore = () => {
    setIsLoadingMore(true);
    let new_page = page + 1;
    feed.getFeed(new_page).then(response => {
      setArticles([...articles, ...response.data]);
    }).finally(() => {
      setIsLoadingMore(false);
    });
    setPage(new_page);
  }


  return (
    <div className='text-neutral-700 m-6 flex flex-col max-w-xl mx-auto'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-light'>
          News Feed
        </h1>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
      </div>

      {
        user && (
          <form onSubmit={handleFilter} className='mt-4 bg-white p-4 rounded-xl border-2 border-neutral-400/20'>
            <p>
              Personalize Your Feed
            </p>
            <div className='mt-4 space-y-2 '>
              <div className='space-y-1'>
                <label htmlFor="category" className='text-neutral-400 font-light text-sm'>
                  Category
                </label>
                <Select
                  isMulti
                  isDisabled={categories.length == 0}
                  onChange={(e) => setSelectedCategories(e.map(option => option.value))}
                  options={categories.map(source => ({ value: source.id, label: source.name }))}
                  value={
                    categories.filter(category => selectedCategories.includes(category.id)).map(category => ({ value: category.id, label: category.name }))
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
                  isDisabled={sources.length == 0}
                  onChange={(e) => setSelectedSources(e.map(option => option.value))}
                  options={sources.map(source => ({ value: source.id, label: source.name }))}
                  value={
                    sources.filter(source => selectedSources.includes(source.id)).map(source => ({ value: source.id, label: source.name }))
                  }
                >
                </Select>
              </div>
            </div>
            <div className='flex space-x-2'>
              <button type='submit' className='mt-2 bg-blue-500 px-2 py-1 text-white rounded-xl'>
                Save
              </button>
            </div>
          </form>
        )
      }
      <div className='mt-4 flex flex-col'>

        {
          isLoading ? (
            <div className='flex space-x-2 items-center justify-center'>
              <p>
                Loading...
              </p>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            </div>
          ) : (
            <>

              <div className='space-y-4'>
                {articles.map((article, index) => (
                  <Article key={index} article={article} />
                ))}
              </div>

              <button className={
                'bg-blue-500 px-2 py-1 text-white rounded-xl mt-4 w-fit mx-auto' + (isLoadingMore ? ' opacity-50' : '')
              }
                onClick={loadMore}
                disabled={isLoadingMore}
              >
                {
                  isLoadingMore ? (
                    <div className='flex space-x-2 items-center'>
                      <p>
                        Loading...
                      </p>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                    </div>
                  ) : 'Load more'
                }
              </button>
            </>
          )

        }
      </div>

    </div>
  );
};

export default Feed;
