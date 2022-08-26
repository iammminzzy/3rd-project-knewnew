import axios from 'axios';

// interface GetProfileType {
//   token: string;
//   id: number;
// }

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
