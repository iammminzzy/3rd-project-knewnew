import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToken } from '../../reducer/userSlice';
import OptionInfo from '../OptionInfo/OptionInfo';
import Loading from '../../components/Status/Loading';
import Error from '../../components/Status/Error';
import { BASE_URL } from '../../api/utils';
import { UserInfoProps } from '../../types/login/index';

export default function KakaoLogin() {
  const navigate = useNavigate();
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
      `${BASE_URL}/user/login/kakao`,
      {},
      {
        headers: { Authorization: kakaoAccessToken },
      }
    );
  };

  const {
    data: kakaoUserInfo,
    isLoading: kakaoUserInfoIsLoding,
    isError: kakaoUserInfoIsError,
  } = useQuery('getKakaoUserInfo', getKakaoUserInfo, {
    onSuccess: kakao => setToken(kakao.data),
    enabled: !!kakaoToken,
    refetchOnWindowFocus: false,
  });

  // Token setting
  const setToken = (userInfo: UserInfoProps) => {
    // 1. access : 전역에
    dispatch(addToken(userInfo.access_token));

    // 2. refresh : localStorage에
    localStorage.setItem('refresh_token', userInfo.refresh_token);

    // 토큰 만료 1분 전, 로그인 연장
    const ACCESS_TOKEN_EXPIRRY_TIME = 0.5 * 3600 * 1000; // 유효기간:30분
    setTimeout(setRefreshToken, ACCESS_TOKEN_EXPIRRY_TIME - 60 * 1000);
  };

  const setRefreshToken = async () => {
    const { data } = await axios.post(`${BASE_URL}/user/refresh`, {
      refresh_token: `${localStorage.getItem('refresh_token')}`,
    });

    dispatch(addToken(data.access));
    localStorage.setItem('refresh_token', data.refresh);
  };

  if (kakaoTokenIsLoding || kakaoUserInfoIsLoding) {
    return <Loading />;
  }
  if (kakaoTokenIsError || kakaoUserInfoIsError) {
    return <Error />;
  }

  const isNew = kakaoUserInfo?.data.is_new;

  if (isNew === true) {
    return <OptionInfo userInfo={kakaoUserInfo?.data} />;
  } else if (isNew === false) {
    alert('뉴뉴에 오신 것을 환영합니다 (>_<)/');
    navigate('/');
  } else {
    alert('다시 시도해 주세요');
    navigate('/signin');
  }

  return <div>KakaoLogin</div>;
}
