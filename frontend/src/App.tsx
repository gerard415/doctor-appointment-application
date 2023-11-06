import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LandingPageLayout from './Components/LandingPageLayout';
import ServicesPage from './Pages/ServicesPage';
import FindDoctorPage from './Pages/FindDoctorPage';
import ContactPage from './Pages/ContactPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPageLayout/>} >
          <Route index element={<HomePage/>} />
          <Route path='/services' element={<ServicesPage/>} />
          <Route path='/doctors' element={<FindDoctorPage/>} />
          <Route path='/contact' element={<ContactPage/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
