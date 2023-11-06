import React from 'react'
import {Outlet} from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';

const LandingPageLayout = () => {
  return (
    <div className='max-w-screen min-h-screen py-7 px-4 phone:px-10 md:px-24 font-poppins overflow-auto space-y-10 flex flex-col justify-between'>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default LandingPageLayout