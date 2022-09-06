import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToken } from '../../reducer/userSlice';
import OptionInfo from '../OptionInfo/OptionInfo';
import Loading from '../../components/Status/Loading';
import Error from '../../components/Status/Error';
import { BASE_URL } from '../../api/utils';

export default function NaverLogin() {
  const [searchParams] = useSearchParams();
  const CODE = searchParams.get('code');
  const STATE = searchParams.get('state');

  //인가코드 보내고 사용자 정보 받기(from BackEnd)
  const getNaverUserInfo = () => {
    return axios.post(
      `${BASE_URL}/user/login/naver?code=${CODE}&state=${STATE}`
    );
  };

  const {
    data: naverUserInfo,
    isLoading: naverUserInfoIsLoding,
    isError: naverUserInfoIsError,
  } = useQuery('getnaverUserInfo', getNaverUserInfo, {
    onSuccess: naver => {
      // useDispatch(addToken(naver.data.refresh_token));
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
  console.log('~ naverUserInfo', naverUserInfo);

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
