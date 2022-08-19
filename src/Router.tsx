import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ItemList from './pages/ItemList/ItemList';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedlist" element={<ItemList />} />
      </Routes>
    </BrowserRouter>
  );
}
