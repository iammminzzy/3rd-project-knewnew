import React, { useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import OptionInfo from '../OptionInfo/OptionInfo';
import Loading from '../../components/Status/Loading';
import Error from '../../components/Status/Error';

export default function KakaoLogin() {
  const [searchParams] = useSearchParams();

  /* Kakao Login */
  const AUTHORIZE_CODE = searchParams.get('code');
  const kakaoTokenLink = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&code=${AUTHORIZE_CODE}`;

  //토큰 받기(from Kakao)
  const getKakaoToken = async () => {
    return await axios.post(kakaoTokenLink, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      maxRedirects: 0,
    });
  };

  const {
    data: kakaoToken,
    isLoading: kakaoTokenIsLoding,
    isError: kakaoTokenIsError,
  } = useQuery('getKakaoToken', getKakaoToken, {
    onSuccess: kakao => {
      localStorage.setItem('kakaoToken', kakao.data.access_token);
    },
    refetchOnWindowFocus: false,
  });

  //사용자 정보 받기(from BackEnd)
  const getKakaoUserInfo = async () => {
    // return await axios.post('/data/optionInfo.json', {
    //   kakaoToken: localStorage.getItem('kakaoToken'),
    // });
    return await axios.get('/data/optionInfo.json');
  };

  const {
    data: kakaoUserInfo,
    isLoading: kakaoUserInfoIsLoding,
    isError: kakaoUserInfoIsError,
  } = useQuery('getKakaoUserInfo', getKakaoUserInfo, {
    enabled: !!kakaoToken,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    getKakaoToken();
    getKakaoUserInfo();
  }, []);

  if (kakaoTokenIsLoding || kakaoUserInfoIsLoding) {
    return <Loading />;
  }
  if (kakaoTokenIsError || kakaoUserInfoIsError) {
    return <Error />;
  }

  console.log(kakaoUserInfo);

  if (kakaoUserInfo) {
    return <OptionInfo userInfo={kakaoUserInfo?.data} />;
  }

  return <div>KakaoLogin</div>;
}
