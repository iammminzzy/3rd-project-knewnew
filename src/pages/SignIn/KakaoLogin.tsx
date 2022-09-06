import React from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import OptionInfo from '../OptionInfo/OptionInfo';
import Loading from '../../components/Status/Loading';
import Error from '../../components/Status/Error';
import { useDispatch } from 'react-redux';
import { addToken } from '../../reducer/userSlice';

export default function KakaoLogin() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const AUTHORIZE_CODE = searchParams.get('code');
  const kakaoTokenLink = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&code=${AUTHORIZE_CODE}`;

  //토큰 받기(from Kakao)
  const getKakaoToken = () => {
    return axios.get(kakaoTokenLink, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  };

  const {
    data: kakaoToken,
    isLoading: kakaoTokenIsLoding,
    isError: kakaoTokenIsError,
  } = useQuery('getKakaoToken', getKakaoToken, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  //사용자 정보 받기(from BackEnd)
  const kakaoAccessToken = kakaoToken?.data.access_token;

  const getKakaoUserInfo = () => {
    return axios.post(
      'http://192.168.0.230:8000/user/login/kakao',
      {},
      {
        headers: { Authorization: JSON.stringify(kakaoAccessToken) },
      }
    );
    // return axios.get('/data/optionInfo.json');
  };

  const {
    data: kakaoUserInfo,
    isLoading: kakaoUserInfoIsLoding,
    isError: kakaoUserInfoIsError,
  } = useQuery('getKakaoUserInfo', getKakaoUserInfo, {
    onSuccess: kakao => {
      dispatch(addToken(kakao.data.refresh_token));
    },
    enabled: !!kakaoToken,
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (kakaoTokenIsLoding || kakaoUserInfoIsLoding) {
    return <Loading />;
  }
  if (kakaoTokenIsError || kakaoUserInfoIsError) {
    return <Error />;
  }

  console.log('kakaoUserInfo', kakaoUserInfo?.data);

  if (kakaoUserInfo) {
    return <OptionInfo userInfo={kakaoUserInfo?.data} />;
  }

  return <div>KakaoLogin</div>;
}
