import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useQuery } from 'react-query';
import OptionInfo from '../OptionInfo/OptionInfo';
import Loading from '../../components/Status/Loading';
import Error from '../../components/Status/Error';

declare global {
  interface Window {
    naver: any;
  }
}

const { naver } = window;

export default function NaverLogin() {
  const location = useLocation();

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: process.env.REACT_APP_NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: 'green', type: 3, height: 30 },
      callbackHandle: true,
    });

    naverLogin.init();
  };

  const naverToken = location.hash && location.hash.split('=')[1].split('&')[0];

  //사용자 정보 받기(from BackEnd)
  const getNaverUserInfo = async () => {
    // return await axios.post(`${process.env.REACT_APP_SERVER_API}`, {
    //   naverToken,
    //   withCredentials: true,
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
  });

  useEffect(() => {
    initializeNaverLogin();
    getNaverUserInfo();
  }, []);

  if (naverUserInfoIsLoding) {
    return <Loading />;
  }
  if (naverUserInfoIsError) {
    return <Error />;
  }

  if (naverUserInfo) {
    return <OptionInfo userInfo={naverUserInfo?.data} />;
  }

  return <div id="naverIdLogin"></div>;
}
