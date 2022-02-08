import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageRender from './PageRender';

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageRender />} />
          <Route path="/:page" element={<PageRender />} />
          <Route path="/:page/:slug" element={<PageRender />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
