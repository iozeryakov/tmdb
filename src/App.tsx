import React, { FC } from 'react';

import { Route, Routes } from 'react-router-dom';

import { Main, Movies, Tv,Info } from './pages';

export const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/movie" element={<Movies />} />
      <Route path="/tv" element={<Tv />} />
      <Route path="/info" element={<Info />} />
    </Routes>
  );
};