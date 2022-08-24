import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import NewFeed from './pages/NewFeed/NewFeed';
import Search from './pages/Search/Search';
import Users from './pages/Users/Users';
import Detail from './pages/Detail/Detail';
import NotFound from './pages/NotFound/NotFound';
import ItemList from './pages/ItemList/ItemList';
import Example2 from './Example2';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedlist" element={<ItemList />} />
        <Route path="/newfeed" element={<NewFeed />} />
        <Route path="/search" element={<Search />} />
        <Route path="/users" element={<Users />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/example2" element={<Example2 />} />
      </Routes>
    </BrowserRouter>
  );
}
