import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LandingPageLayout from './Components/LandingPageLayout';
import ServicesPage from './Pages/ServicesPage';
import FindDoctorPage from './Pages/FindDoctorPage';
import ContactPage from './Pages/ContactPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ProfilePage from './Pages/ProfilePage';
import axios from 'axios'
import UserContextProvider from './UserContext';
import DoctorDashboard from './Pages/DoctorDashboard';

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<LandingPageLayout/>} >
          <Route index element={<HomePage/>} />
          <Route path='/services' element={<ServicesPage/>} />
          <Route path='/doctors' element={<FindDoctorPage/>} />
          <Route path='/contact' element={<ContactPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/profile' element={<ProfilePage/>}/>
        </Route>

        <Route path='doctordashboard' element={<DoctorDashboard/>}/>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
