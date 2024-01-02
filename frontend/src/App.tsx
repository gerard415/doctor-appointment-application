import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LandingPageLayout from './Layouts/LandingPageLayout';
import ServicesPage from './Pages/ServicesPage';
import FindDoctorPage from './Pages/FindDoctorPage';
import ContactPage from './Pages/ContactPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import PatientBookingsPage from './Pages/PatientBookingsPage';
import axios from 'axios'
import UserContextProvider from './UserContext';
import DoctorDashboard from './Pages/DoctorDashboard';
import ProfilePageLayout from './Layouts/ProfilePageLayout';
import PatientSettingsPage from './Pages/PatientSettingsPage';
import SingleDoctorPageLayout from './Layouts/SingleDoctorPageLayout';
import SingleDoctorAboutPage from './Pages/SingleDoctorAboutPage';
import SingleDoctorFeedbackPage from './Pages/SingleDoctorFeedbackPage';

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
          <Route path='/doctors/:id' element={<SingleDoctorPageLayout/>}>
            <Route index element={<SingleDoctorAboutPage/>}/>
            <Route path='/doctors/:id/feedback' element={<SingleDoctorFeedbackPage/>}/>
          </Route>
          <Route path='/contact' element={<ContactPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/profile' element={<ProfilePageLayout/>}>
            <Route index element={<PatientBookingsPage/>}/>
            <Route path='/profile/settings' element={<PatientSettingsPage/>}/>
          </Route>
        </Route>

        <Route path='doctordashboard' element={<DoctorDashboard/>}/>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
