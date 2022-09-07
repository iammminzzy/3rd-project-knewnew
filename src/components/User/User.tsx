import React from 'react';
import styled from 'styled-components';

interface Props {
  user: {
    id: number;
    profile_image: string;
    nickname: string;
    introduction_tags?: {
      name: string;
    };
  };
}

const User = ({ user }: Props) => {
  return (
    <UserProfileWrap>
      <ProfileImg src={user.profile_image} alt="" />
      <ProfileInfo>
        <Nickname>{user.nickname}</Nickname>
        <ProfileTag>{user.introduction_tags?.name}</ProfileTag>
      </ProfileInfo>
    </UserProfileWrap>
  );
};

export default User;

const UserProfileWrap = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 100%;

  @media (max-width: 767px) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 9px;
  margin-left: 18px;
`;

const Nickname = styled.span`
  font-size: 20px;
  font-weight: 600;

  @media (max-width: 767px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const ProfileTag = styled.span`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.black50};

  @media (max-width: 767px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;
