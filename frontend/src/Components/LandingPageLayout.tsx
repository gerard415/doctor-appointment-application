import React from 'react'
import {Outlet} from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';

const LandingPageLayout = () => {
  return (
    <div className='max-w-screen min-h-screen font-poppins space-y-10 flex flex-col justify-between overflow-x-hidden '>
      <div className='bg-white sticky top-0 w-full z-30 flex middle:px-10 lg:px-24 galaxyfold:px-7 '>
        <Navbar/>
      </div>
      <Outlet/>
      <div className='middle:px-10 lg:px-24 galaxyfold:px-7'>
        <Footer/>
      </div>
    </div>
  )
}

export default LandingPageLayout