import axios from 'axios';
import { BASE_URL } from './utils';
// const LOCAL_TEST = 'http://192.168.0.226:8000/review/1/';

export const getDetail = async () => {
  const { data } = await axios.get(`${BASE_URL}/data/detail.json`);
  // const { data } = await axios.get(`${LOCAL_TEST}`);
  if (data) {
    return data;
  }
};
