import React from 'react'
import HeroSection from '../Components/HeroSection'
import FAQ from '../Components/FAQ'
import Services from '../Components/Services'
import ProvideMedicalServices from '../Components/ProvideMedicalServices'
import NationsBest from '../Components/NationsBest'

const HomePage = () => {
  return (
    <div className='space-y-[100px] phone:px-10 lg:px-24 '>
        {/* <HeroSection/> */}
        <ProvideMedicalServices/>
        <NationsBest/>
        <Services/>
        <FAQ/>
    </div>
  )
}

export default HomePage