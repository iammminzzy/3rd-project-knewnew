import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToken, test, TokenType } from '../../reducer/userSlice';
import OptionInfo from '../OptionInfo/OptionInfo';
import Loading from '../../components/Status/Loading';
import Error from '../../components/Status/Error';
import { BASE_URL } from '../../api/utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

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
    // return axios.post(
    //   `${BASE_URL}/user/login/kakao`,
    //   {},
    //   {
    //     headers: { Authorization: JSON.stringify(kakaoAccessToken) },
    //   }
    // );
    return axios.get('/data/loginInfo.json');
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

  const refreshToken = useSelector(
    (state: RootState) => state.tokenState.value
  );
  console.log('refresh token', refreshToken);

  if (kakaoTokenIsLoding || kakaoUserInfoIsLoding) {
    return <Loading />;
  }
  if (kakaoTokenIsError || kakaoUserInfoIsError) {
    return <Error />;
  }

  console.log('~ kakaoUserInfo?.data', kakaoUserInfo?.data);
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
