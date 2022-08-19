import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { FaHome } from 'react-icons/fa';
import { RiPencilFill } from 'react-icons/ri';
import { BsSearch } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

const Footer = () => {
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
    link: '/',
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
  z-index: 1;

  position: fixed;
  max-width: 480px;

  bottom: 0;

  width: 100%;
  height: 10%;

  background-color: ${({ theme }) => theme.colors.white80};
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);

  border: 1px solid ${({ theme }) => theme.colors.white50};
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

const Box = styled.div`
  display: flex;

  height: 100%;
`;

const NavLinkStyled = styled(NavLink)`
  color: rgba(0, 0, 0, 0.5);
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

  font-size: 22px;

  p {
    font-size: 14px;
  }
`;
