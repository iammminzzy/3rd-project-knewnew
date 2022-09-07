import axios from 'axios';
import { BASE_URL } from './utils';
const URL = 'http://192.168.0.226:8000/review';
const ACCESS_TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYyNTM3NTAwLCJpYXQiOjE2NjI1MjY3MDAsImp0aSI6IjY3MDhlM2RkZTlmZTRmOGM4ZDdkN2Y0NWU4Y2NkZTQyIiwidXNlcl9pZCI6MX0.AXgK5l0NbXEbaRf-pOygcN-t3FLk-dGxTMPrhKhqsJU';

export const getComment = async (id: string | undefined) => {
  const { data } = await axios.get(`${URL}/${id}/comment/`);
  if (data) {
    return data;
  }
};

export const postComment = async (
  id: string | undefined,
  parent_comment: number | null,
  description: string
) => {
  if (parent_comment === 0) {
    parent_comment = null;
  }
  const { status } = await axios.post(
    `${URL}/${id}/comment/`,
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
