import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RiPencilFill } from 'react-icons/ri';
import Loading from '../../components/Status/Loading';
import Error from '../../components/Status/Error';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function Users() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const menuArr = [
    { name: '작성 글', content: '' },
    { name: '담은 글', content: '' },
    { name: '담은 상품', content: '' },
  ];

  const selectMenuHandler = (index: number) => {
    setCurrentTab(index);
  };

  // useEffect(() => {
  //   const isLogged = localStorage.getItem('isLogged');
  //   if (!isLogged) {
  //     navigate('/signin');
  //     return;
  //   }
  // }, []);

  const getUserInfo = () => {
    return axios.get('/data/userInfo.json');
  };

  const {
    data: userInfo,
    isLoading: userInfoIsLoding,
    isError: userInfoIsError,
  } = useQuery('getUserInfo', getUserInfo, {
    refetchOnWindowFocus: false,
    retry: false,
  });
  console.log('~ userInfo', userInfo?.data);

  if (userInfoIsLoding) {
    return <Loading />;
  }
  if (userInfoIsError) {
    return <Error />;
  }

  return (
    <Container>
      <Back>
        <Content>
          <Wapper>
            <Info>
              <Description>
                <NickName>
                  {userInfo?.data.nickname}
                  <p>
                    {userInfo?.data.introduction_tags.map(
                      (tag: string, idx: number) => (
                        <Individuality key={idx}>{tag}&nbsp;</Individuality>
                      )
                    )}
                  </p>
                </NickName>
              </Description>
              <Profile>
                <ProfileImg
                  src={userInfo?.data.profile_image}
                  alt="profileimg"
                />
              </Profile>
            </Info>
            <Form>
              <Input
                type="text"
                placeholder="자기소개를 입력해주세요."
                disabled
              />
              <PenIcon />
            </Form>
          </Wapper>
          <Tab>
            {menuArr.map((item, index) => (
              <Menu
                className={currentTab === index ? 'submenu focused' : 'submenu'}
                key={item.name}
                onClick={() => selectMenuHandler(index)}
              >
                {item.name}
              </Menu>
            ))}
          </Tab>
        </Content>
        <PostList>
          <h1>{menuArr[currentTab].content}</h1>
          {menuArr[currentTab].content.length >= 0 && (
            <NotPost>{menuArr[currentTab].name}이 없습니다.</NotPost>
          )}
          <Create to="/newfeed">작성하기</Create>
        </PostList>
      </Back>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Back = styled.div`
  max-width: 768px;
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: ${({ theme }) => theme.colors.white80}; ;
`;

const Content = styled.div`
  display: flex;
  position: relative;
  max-width: 768px;
  height: 28%;
  width: 100%;
  margin-top: 64px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 20px 20px -20px rgba(0, 0, 0, 0.3);
`;

const Wapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  margin: 25px 20px;

  @media (max-width: 767px) {
    gap: 15px;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

const Description = styled.div``;

const Profile = styled.div`
  margin: 0px 20px;
`;

const NickName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 25px;
  font-weight: 800;
`;

const Individuality = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black50};
`;

const ProfileImg = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 100%;

  @media (max-width: 767px) {
    width: 75px;
    height: 75px;
  }

  @media (max-width: 480px) {
    width: 75px;
    height: 75px;
  }
`;

const Form = styled.form`
  width: 100%;
  padding: 10px;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.red80};
  border-radius: 10px;
  opacity: 0.7;

  @media (max-width: 480px) {
    padding: 6px;
  }
`;

const Input = styled.input``;

const PenIcon = styled(RiPencilFill)`
  position: absolute;
  right: 5%;

  color: ${({ theme }) => theme.colors.black50};
`;

const Tab = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  bottom: 0px;

  text-align: center;
  width: 100%;
`;

const Menu = styled.li`
  width: 33%;
  padding-bottom: 13px;
  border-bottom: 2px solid inherit;
  color: ${({ theme }) => theme.colors.black50};
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;

  &.focused {
    border-bottom: 2px solid ${({ theme }) => theme.colors.black80};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.black80};
  }
`;

const PostList = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
`;

const NotPost = styled.span`
  color: ${({ theme }) => theme.colors.black50};
  font-weight: 500;
  position: fixed;
  bottom: 30%;
`;

const Create = styled(Link)`
  position: absolute;
  bottom: 20%;
  width: 80%;
  max-width: 500px;
  padding: 13px;
  color: ${({ theme }) => theme.colors.red80};
  border: 1px solid ${({ theme }) => theme.colors.red80};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  opacity: 0.9;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.white};
  }
`;
