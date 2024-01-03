import React from 'react'
import {Outlet} from "react-router-dom";
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const LandingPageLayout = () => {
  return (
    <div className='max-w-screen min-h-screen font-poppins space-y-10 flex flex-col  overflow-x-hidden '>
      <div className='bg-white sticky top-0 w-full z-30 flex middle:px-10 lg:px-24 galaxyfold:px-7 '>
        <Navbar/>
      </div>
      <div className='min-h-[500px] '>
        <Outlet/>
      </div>
      <div className='middle:px-10 lg:px-24 galaxyfold:px-7'>
        <Footer/>
      </div>
    </div>
  )
}

export default LandingPageLayout