import React from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import OptionInfo from '../OptionInfo/OptionInfo';
import Loading from '../../components/Status/Loading';
import Error from '../../components/Status/Error';

export default function NaverLogin() {
  const [searchParams] = useSearchParams();
  const CODE = searchParams.get('code');
  const STATE = searchParams.get('state');

  //인가코드 보내고 사용자 정보 받기(from BackEnd)
  const getNaverUserInfo = () => {
    return axios.post(
      `http://192.168.0.230:8000/user/login/naver?code=${CODE}&state=${STATE}`
    );
  };

  const {
    data: naverUserInfo,
    isLoading: naverUserInfoIsLoding,
    isError: naverUserInfoIsError,
  } = useQuery('getnaverUserInfo', getNaverUserInfo, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (naverUserInfoIsLoding) {
    return <Loading />;
  }
  if (naverUserInfoIsError) {
    return <Error />;
  }

  if (naverUserInfo) {
    console.log('~ naverUserInfo', naverUserInfo);

    return <OptionInfo userInfo={naverUserInfo?.data} />;
  }

  return <div>NaverLogin</div>;
}
