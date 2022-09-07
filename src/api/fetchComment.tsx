import axios from 'axios';
import { BASE_URL } from './utils';

export const getComment = async (id: string | undefined) => {
  const { data } = await axios.get(`${BASE_URL}/review/${id}/comment/`);
  if (data.results) {
    return data.results;
  }
};

export const postComment = async (
  ACCESS_TOKEN: string,
  id: string | undefined,
  parent_comment: number | null,
  description: string
) => {
  if (parent_comment === 0) {
    parent_comment = null;
  }
  const { status } = await axios.post(
    `${BASE_URL}/review/${id}/comment/`,
    {
      review: id,
      parent_comment,
      like_count: 0,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
  if (status === 201) {
    const result = await getComment(id);
    return result;
  }
  return 'error';
};
