import React from 'react';
import styled from 'styled-components';
import { BsBell } from 'react-icons/bs';
import { useEffect, useState } from 'react';

const FeedNav = () => {
  const [scrollY, setScrollY] = useState(0);
  const [openCategory, setOpenCategory] = useState(false);
  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if (scrollY > 50) {
      return setOpenCategory(true);
    }
    return setOpenCategory(false);
  };

  useEffect(() => {
    const scroll = () => {
      window.addEventListener('scroll', handleFollow);
    };
    scroll();
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  });

  if (openCategory) {
    return (
      <MenuContainer>
        <NavBar>
          <div>
            <Title>모든 메뉴</Title>
          </div>
          <div>
            <Bell />
          </div>
        </NavBar>
      </MenuContainer>
    );
  }
  return (
    <Container>
      <NavBar>
        <div>
          <Logo alt="logo" src="images/logo.png" />
        </div>
        <div>
          <Bell />
        </div>
      </NavBar>
    </Container>
  );
};

export default FeedNav;

const Container = styled.div`
  position: fixed;
  max-width: 480px;

  width: 100%;
  background-color: ${({ theme }) => theme.colors.white80};
  border: 1px solid ${({ theme }) => theme.colors.white80};
`;

const MenuContainer = styled(Container)`
  border: 1px solid ${({ theme }) => theme.colors.white50};
  background-color: ${({ theme }) => theme.colors.white};
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;

  gap: 130px;
  margin: 10px auto;
  width: 100%;
  min-height: 42px;
`;

const Logo = styled.img`
  max-width: 100px;
`;

const Bell = styled(BsBell)`
  font-size: 20px;
  opacity: 0.8;
`;

const Title = styled.p`
  max-width: 100px;
  min-width: 100px;
  font-weight: 700;
`;
