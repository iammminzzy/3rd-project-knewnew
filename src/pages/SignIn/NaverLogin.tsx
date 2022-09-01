import React, { useEffect } from 'react';
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
  const naverTokenLink = `/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&client_secret=${process.env.REACT_APP_NAVER_CLIENT_SECRET}&code=${CODE}&state=${STATE}`;

  //토큰 받기(from Naver)
  const getNaverToken = async () => {
    return await axios.get(naverTokenLink);
  };

  const {
    data: naverToken,
    isLoading: naverTokenIsLoding,
    isError: naverTokenIsError,
  } = useQuery('getNaverToken', getNaverToken, {
    onSuccess: naver => {
      localStorage.setItem('naverAccessToken', naver.data.access_token);
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  //사용자 정보 받기(from BackEnd)
  const naverAccessToken = localStorage.getItem('naverAccessToken');

  const getNaverUserInfo = async () => {
    // return await axios.get('http://192.168.0.230:8000/user/login/naver', {
    //   headers: { Authorization: JSON.stringify(naverAccessToken) },
    //   // withCredentials: true, //cors에러 처리를 위해
    // });
    return await axios.get('/data/optionInfo.json');
  };

  const {
    data: naverUserInfo,
    isLoading: naverUserInfoIsLoding,
    isError: naverUserInfoIsError,
  } = useQuery('getnaverUserInfo', getNaverUserInfo, {
    enabled: !!naverToken,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    if (CODE) {
      getNaverToken();
      getNaverUserInfo();
    } else {
      alert('네이버 로그인 인증에 실패하였습니다.');
    }
  }, []);

  if (naverTokenIsLoding || naverUserInfoIsLoding) {
    return <Loading />;
  }
  if (naverTokenIsError || naverUserInfoIsError) {
    return <Error />;
  }

  if (naverUserInfo) {
    return <OptionInfo userInfo={naverUserInfo?.data} />;
  }

  return <div>NaverLogin</div>;
}
