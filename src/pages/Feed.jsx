import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../app/stores/auth';
import api from '../utils/api';
import { feed } from '../api/feed';
import Article from '../components/Article';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

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
  const [showPreferences, setShowPreferences] = useState(false);

  const [selectedSources, setSelectedSources] = useState(
    user?.preferences?.sources ?? []
  );
  const [selectedCategories, setSelectedCategories] = useState(
    user?.preferences?.categories ?? []
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
        <button type='button' onClick={() => setShowPreferences(!showPreferences)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>
        </button>
      </div>

      <div
        className={`mt-2 transition-all duration-500 ease-in-out ${showPreferences ? 'max-h-screen' : 'max-h-0 overflow-hidden'
          }`}
      >
        <div className='p-4 bg-white rounded-xl border-2 border-neutral-400/20'>
          {
            (user != null) ? (

              <form onSubmit={handleFilter} className='mt-4'>
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
                      placeholder={categories.length == 0 ? 'Loading categories ...' : 'Select categories'}
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
                      placeholder={categories.length == 0 ? 'Loading sources ...' : 'Select sources'}
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
                  <button type='submit'
                    disabled={isLoading}
                    className='mt-2 bg-blue-500 px-2 py-1 text-white rounded-xl'>
                    Save And Apply
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div>
                  <p className='text-sm text-neutral-400 '>
                    You need to be logged in to personalize your feed.
                  </p>

                  <div className='flex justify-center'>
                    <Link to='/'>
                      <button type='button' className='mt-2 bg-blue-500 px-2 py-1 text-white rounded-xl'>
                        Register / Login
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            )
          }
        </div>
      </div>
      <div className='mt-4 flex flex-col'>

        {
          isLoading ? (
            <div className='self-center'>
              <Loading />
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
                    <Loading />
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
