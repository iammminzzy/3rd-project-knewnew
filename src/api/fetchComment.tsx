import axios from 'axios';
import { BASE_URL } from './utils';
const LOCAL_TEST = 'http://192.168.0.226:8000/review/1/comment/';
const POST_URL = 'http://192.168.0.226:8000/review/1/comment/';
const ACCESS_TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYyMzYzNjc0LCJpYXQiOjE2NjIzNjE4NzQsImp0aSI6ImQ4ZGQ3MzgyZDQxYzRjZDY4ZDAyOThiZmZlYmFmZDBiIiwidXNlcl9pZCI6MX0.ed7s8DlCvZr6rm-x-XdgcXm-5Ta48bppNmZ6A_cJiF0';

export const getComment = async () => {
  // const { data } = await axios.get(`${BASE_URL}/data/comment.json`);
  const { data } = await axios.get(LOCAL_TEST, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  if (data) {
    console.log(data);
    return data;
  }
};

export const postComment = async () => {
  const response = await axios.post(
    POST_URL,
    {
      review: 1,
      parent_comment: 1,
      like_count: 0,
      description: '이거되냐',
    },
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
  console.log(response.data);
};

// export const postComment = async () => {
//   const response = await fetch(POST_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${ACCESS_TOKEN}`,
//     },
//     body: JSON.stringify({
//       review: 1,
//       parent_comment: null,
//       like_count: 0,
//       description: '이것도들어가냐',
//     }),
//   });
//   console.log(response);
//   const result = await response.json();
//   console.log(result);
// };
