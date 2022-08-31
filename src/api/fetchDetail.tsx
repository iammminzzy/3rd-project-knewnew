import axios from 'axios';
import { BASE_URL } from './utils';

export const getDetail = async () => {
  const { data } = await axios.get(`${BASE_URL}/data/test.json`);
  if (data) {
    return data;
  }
};
