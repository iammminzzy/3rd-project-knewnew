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
import { UserInfoProps } from '../../types/login';

export default function NaverLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    onSuccess: naver => setToken(naver.data),
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

  if (naverUserInfoIsLoding) {
    return <Loading />;
  }
  if (naverUserInfoIsError) {
    return <Error />;
  }

  const isNew = naverUserInfo?.data.is_new;

  if (isNew === true) {
    return <OptionInfo userInfo={naverUserInfo?.data} />;
  } else if (isNew === false) {
    alert('뉴뉴에 오신 것을 환영합니다 (>_<)/');
    navigate('/');
  } else {
    alert('다시 시도해 주세요');
    navigate('/signin');
  }

  return <div>NaverLogin</div>;
}
