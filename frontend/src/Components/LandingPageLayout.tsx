import React from 'react'
import {Outlet} from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';

const LandingPageLayout = () => {
  return (
    <div className='max-w-screen min-h-screen font-poppins space-y-10 flex flex-col justify-between phone:px-10 lg:px-24 '>
      <div className='bg-white sticky top-0 w-full z-30 h-[70px] flex '>
        <Navbar/>
      </div>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default LandingPageLayout