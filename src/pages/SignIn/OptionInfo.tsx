import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

export default function OptionInfo() {
  const [searchParams] = useSearchParams();
  const AUTHORIZE_CODE = searchParams.get('code');
  const [kakaoToken, setKakaoToken] = useState();

  //kakao Token 받아오기
  const getKakaoToken = async () => {
    return await axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&code=${AUTHORIZE_CODE}`,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );
  };

  const getOurToken = async () => {
    return await axios
      .post(`api`, {
        kakaoToken: kakaoToken,
      })
      .then(res => console.log(res));
  };

  const { isLoading, isError } = useQuery('getKakaoToken', getKakaoToken, {
    onSuccess: data => {
      setKakaoToken(data.data.access_token);
      getOurToken();
    },
  });

  if (isLoading) {
    return <Loading>Loading. . .</Loading>;
  }

  if (isError) {
    return <Loading>Error ⚠️</Loading>;
  }

  return (
    <OptionInfoWrap>
      <Greeting>
        <User>뉴뉴</User>님 반가워요!
      </Greeting>
    </OptionInfoWrap>
  );
}

const OptionInfoWrap = styled.div`
  margin: 0;
`;

const Greeting = styled.div`
  font-size: 20px;
`;

const User = styled.span`
  color: hotpink;
`;

const Loading = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
`;
