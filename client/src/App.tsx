import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Alert from './components/alert/Alert';
import Footer from './components/global/Footer';
import Header from './components/global/Header';
import PageRender from './PageRender';

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Alert />
        <Routes>
          <Route path="/" element={<PageRender />} />
          <Route path="/:page" element={<PageRender />} />
          <Route path="/:page/:slug" element={<PageRender />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
