import api from "../utils/api";

const getFeed = (page) => api.get('/api/feed', {
  params: {
    page: page
  }
});


const getSources = () => api.get('/api/sources');

const getCategories = () => api.get('/api/categories');


const getAuthors = () => api.get('/api/authors')


export const feed = {
  getFeed,
  getSources,
  getCategories,
  getAuthors
};
