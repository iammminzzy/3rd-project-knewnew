import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RiPencilFill } from 'react-icons/ri';

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
  return (
    <Container>
      <Back>
        <Content>
          <Wapper>
            <UserInfo>
              <Description>
                <NickName>
                  TEST#8096
                  <Individuality>간단함파 1인가구 학생</Individuality>
                </NickName>
              </Description>
              <Profile>
                <ProfileImg
                  src={
                    'https://images.unsplash.com/photo-1660678473509-120139e9317b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80'
                  }
                  alt="profileimg"
                />
              </Profile>
            </UserInfo>
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
          <CreateButton type="button">작성하기</CreateButton>
        </PostList>
      </Back>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;
`;

const Back = styled.div`
  max-width: 768px;
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: ${({ theme }) => theme.colors.white80};
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  max-width: 768px;
  height: 30%;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
`;

const Wapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 15px;
  margin: 0px 20px;

  width: 100%;
`;

const UserInfo = styled.div`
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
  gap: 8px;

  font-size: 25px;
  font-weight: 800;
`;

const Individuality = styled.p`
  font-size: 12px;
  font-weight: 400;

  color: ${({ theme }) => theme.colors.black50};
`;

const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;

  @media (max-width: 767px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }
`;

const Form = styled.form`
  width: 100%;
  padding: 10px;
  position: relative;

  border: 1px solid ${({ theme }) => theme.colors.red80};
  border-radius: 10px;

  opacity: 0.7;
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

const CreateButton = styled.button`
  position: fixed;
  bottom: 20%;

  width: 80%;
  max-width: 500px;
  padding: 13px;
  border: 1px solid ${({ theme }) => theme.colors.red80};
  border-radius: 5px;

  font-size: 16px;
  font-weight: 600;

  color: ${({ theme }) => theme.colors.red80};
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  opacity: 0.9;
`;
