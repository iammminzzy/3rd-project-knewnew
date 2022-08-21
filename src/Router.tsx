import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import FeedNav from './components/Nav/FeedNav';
import NewFeedNav from './components/Nav/NewFeedNav';
import SearchNav from './components/Nav/SearchNav';
import UsersNav from './components/Nav/UsersNav';

import Home from './pages/Home/Home';
import NewFeed from './pages/NewFeed/NewFeed';
import Search from './pages/Search/Search';
import Users from './pages/Users/Users';
import Detail from './pages/Detail/Detail';
import NotFound from './pages/NotFound/NotFound';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FeedNav />} />
        <Route path="/newfeed" element={<NewFeedNav />} />
        <Route path="/search" element={<SearchNav />} />
        <Route path="/users" element={<UsersNav />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newfeed" element={<NewFeed />} />
        <Route path="/search" element={<Search />} />
        <Route path="/users" element={<Users />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
