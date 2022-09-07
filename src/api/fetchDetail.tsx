import axios from 'axios';
import { BASE_URL } from './utils';

export const getDetail = async (id: string | undefined) => {
  console.log(`${BASE_URL}/review/${id}/`);
  const { data } = await axios.get(`${BASE_URL}/review/${id}/`);
  console.log(data);
  if (data) {
    return data;
  }
};
