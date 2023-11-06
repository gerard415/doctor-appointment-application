import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LandingPageLayout from './Components/LandingPageLayout';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPageLayout/>} >
          <Route index element={<HomePage/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
