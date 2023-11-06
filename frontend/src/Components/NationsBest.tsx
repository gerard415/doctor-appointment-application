import React from 'react'
import image from '../assets/images/OQ6UTW0.jpg'
import { Link } from 'react-router-dom'

const NationsBest = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 '>
        <div className='hidden lg:inline'>
            <img src={image} alt="" className='lg:h-[650px]  xl:h-[550px] w-[500px] ' />
        </div>
        <div >
            <p className='font-bold text-[19px] text-center lg:text-left mb-4 '>Proud to be one of the nations best</p>
            <div className='text-gray-500 leading-7 font-light mx-auto text-[13px] space-y-[30px] mb-4 '>
                <p>For 30 years in a row, U.S news & World Report has recognized us as one of the best public hospitals on the Nation and #1 in Texas. Lorem ipsum dolor sit armet consecteur, adispisicing eiit. Quas nemp?</p>
                <p>Our best is something we strive for each and every day, caring for our petients -not looking back at what we accomplished but towards what we can do tomorrow, providing the best. Lorem ipsum dolor sit armet consecteur, adispisicing eiit. Quas nemp? </p>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi conse</p>
            </div>
            <Link to={'/'} className='bg-blue-600 text-[13px] p-2 px-5 mt-4 rounded-2xl text-white'>Learn More</Link>
        </div>
    </div>
  )
}

export default NationsBest