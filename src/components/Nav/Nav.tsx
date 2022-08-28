import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import FeedNav from './FeedNav';
import SearchNav from './SearchNav';
import EtcNav from './EtcNav';

const Nav = () => {
  const location = useLocation();
  const loadNav = () => {
    const userLocation = location.pathname;
    if (userLocation.includes('/feedlist')) {
      return <FeedNav />;
    }
    if (userLocation.includes('/search')) {
      return <SearchNav />;
    }
    return <EtcNav userLocation={userLocation} />;
  };

  return <NavBar>{loadNav()}</NavBar>;
};

const NavBar = styled.header`
  position: fixed;
  top: 0;
  z-index: 1;

  width: 100%;
  display: flex;
  justify-content: center;
`;

export default Nav;
