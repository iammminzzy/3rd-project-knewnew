import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';

import NewFeed from './pages/NewFeed/NewFeed';
import Users from './pages/Users/Users';
import NotFound from './pages/NotFound/NotFound';
import ItemList from './pages/ItemList/ItemList';
import SignIn from './pages/SignIn/SignIn';
import KakaoLogin from './pages/SignIn/KakaoLogin';
import NaverLogin from './pages/SignIn/NaverLogin';
import NewFeedWrite from './pages/NewFeed/NewFeedWrite';
import Detail from './pages/Detail';
import Comment from './components/Comment';

export function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/feedlist" />} />
        <Route path="/feedlist" element={<ItemList />} />
        <Route path="/newfeed" element={<NewFeed />} />
        <Route path="/newfeedwrite" element={<NewFeedWrite />} />
        <Route path="/users" element={<Users />} />
        <Route
          path="/detail/:id"
          element={
            <>
              <Detail />
              <Comment />
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login/kakao" element={<KakaoLogin />} />
        <Route path="/login/naver" element={<NaverLogin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
