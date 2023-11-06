import React from 'react'
import HeroSection from '../Components/HeroSection'
import FAQ from '../Components/FAQ'
import Services from '../Components/Services'
import ProvideMedicalServices from '../Components/ProvideMedicalServices'

const HomePage = () => {
  return (
    <div className='space-y-10 '>
        {/* <HeroSection/> */}
        <ProvideMedicalServices/>
        <Services/>
        <FAQ/>
    </div>
  )
}

export default HomePage