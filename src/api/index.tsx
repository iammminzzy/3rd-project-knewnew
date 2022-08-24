import axios from 'axios';

// interface GetProfileType {
//   token: string;
//   id: number;
// }

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const getPostsPage = async (pageParam = 1, options = {}) => {
  const response = await api.get(`/posts?_page=${pageParam}`, options);
  return response.data;
};

export const getFeed = async () => {
  const Feed = await axios.get('/data/feed.json', {
    headers: {
      // token
    },
  });
  if (Feed) {
    return Feed.data;
  }
};

export const getDetail = async () => {
  const Detail = await axios.get('/data/detail.json', {
    headers: {
      // token
    },
  });
  if (Detail) {
    return Detail.data;
  }
};
