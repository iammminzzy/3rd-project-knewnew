import React from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';

import { FaHome } from 'react-icons/fa';
import { RiPencilFill } from 'react-icons/ri';
import { BsSearch } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

const Footer = () => {
  const location = useLocation();
  if (
    location.pathname.includes('detail') ||
    location.pathname.includes('signin')
  ) {
    return null;
  }
  return (
    <Container>
      <Box>
        <NavUl>
          {NAV_DATA.map(item => (
            <NavLinkStyled to={item.link} key={item.id}>
              <NavLi>
                {item.icon}
                <p>{item.description}</p>
              </NavLi>
            </NavLinkStyled>
          ))}
        </NavUl>
      </Box>
    </Container>
  );
};

export default Footer;

const NAV_DATA = [
  {
    id: 1,
    icon: <FaHome />,
    description: '홈',
    link: '/feedlist',
  },
  {
    id: 2,
    icon: <RiPencilFill />,
    description: '글쓰기',
    link: '/newfeed',
  },
  {
    id: 3,
    icon: <BsSearch />,
    description: '검색',
    link: '/search',
  },
  {
    id: 4,
    icon: <FaUser />,
    description: '마이',
    link: '/users',
  },
];

const Container = styled.div`
  position: fixed;
  bottom: 0;
  height: 10%;

  width: 100%;
`;

const Box = styled.div`
  display: flex;
  height: 100%;

  margin: 0 auto;
  max-width: 768px;

  background-color: ${({ theme }) => theme.colors.white60};
  box-shadow: 0 5px 32px 0 rgba(0, 0, 0, 0.3);

  border: 1px solid ${({ theme }) => theme.colors.white60};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  white-space: pre-wrap;

  z-index: 1;
`;

const NavLinkStyled = styled(NavLink)`
  color: rgba(0, 0, 0, 0.3);
  &:link {
    transition: 0.3s;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.red};
  }
  &.active {
    color: ${({ theme }) => theme.colors.red};
  }
`;

const NavUl = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100%;
`;

const NavLi = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  gap: 5px;

  font-size: 35px;

  p {
    font-size: 13px;
  }

  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: 30px;
  }
  @media all and (max-width: 479px) {
    font-size: 22px;
  }
`;
