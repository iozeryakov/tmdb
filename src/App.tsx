import React, { FC } from "react";

import { Route, Routes } from "react-router-dom";

import { Info } from "./pages/Info/Info";
import { Tv } from "./pages/Tv/Tv";
import { Main } from "./pages/Main/Main";
import { Movies } from "./pages/Movies/Movies";

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
