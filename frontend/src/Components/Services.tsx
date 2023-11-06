import React from 'react'

const Services = () => {
  return (
    <div className="">
        <div className=" flex flex-col ">
            <header className="text-center mx-auto mb-12 lg:px-20">
                <h2 className="text-[19px] leading-normal mb-2 font-bold text-black">Our Medical Services</h2>
                <p className="text-gray-500 leading-relaxed font-light mx-auto pb-2 text-[13px] ">
                    World class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic
                </p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-center ">
                <div className="fadeInUp" data-wow-duration="1s" style={{visibility:'visible', animationDuration: '1s', animationName:'fadeInUp'}}>
                    <div className="py-8 px-12 mb-12 bg-gray-100 border-b border-gray-100 transform transition duration-300 ease-in-out hover:-translate-y-2">
                        <h3 className="text-lg leading-normal mb-2 font-semibold text-black">Cancer Care</h3>
                        <p className="text-gray-500">This is a wider card with supporting text below as a natural content.</p>
                    </div>
                </div>
                <div className="fadeInUp" data-wow-duration="1s" data-wow-delay=".1s" style={{visibility:'visible', animationDuration: '1s', animationDelay:'0.1s', animationName:'fadeInUp'}}>
                    <div className="py-8 px-12 mb-12 bg-gray-100 border-b border-gray-100 transform transition duration-300 ease-in-out hover:-translate-y-2">
                        <h3 className="text-lg leading-normal mb-2 font-semibold text-black">Labor & Delivery</h3>
                        <p className="text-gray-500">This is a wider card with supporting text below as a natural content.</p>
                    </div>
                </div>
                <div className="fadeInUp" data-wow-duration="1s" data-wow-delay=".3s" style={{visibility:'visible', animationDuration: '1s', animationDelay:'0.3s', animationName:'fadeInUp'}}>
                    <div className="py-8 px-12 mb-12 bg-gray-100 border-b border-gray-100 transform transition duration-300 ease-in-out hover:-translate-y-2">
                        <h3 className="text-lg leading-normal mb-2 font-semibold text-black">Heart & Vascular</h3>
                        <p className="text-gray-500">This is a wider card with supporting text below as a natural content.</p>
                    </div>
                </div>
                <div className="fadeInUp" data-wow-duration="1s" style={{visibility:'visible', animationDuration: '1s', animationDelay:'0.1s', animationName:'fadeInUp'}}>
                    <div className="py-8 px-12 mb-12 bg-gray-100 border-b border-gray-100 transform transition duration-300 ease-in-out hover:-translate-y-2">
                        <h3 className="text-lg leading-normal mb-2 font-semibold text-black">Mental Health</h3>
                        <p className="text-gray-500">This is a wider card with supporting text below as a natural content.</p>
                    </div>
                </div>
                <div className="fadeInUp" data-wow-duration="1s" data-wow-delay=".1s" style={{visibility:'visible', animationDuration: '1s', animationDelay:'0.1s', animationName:'fadeInUp'}}>
                    <div className="py-8 px-12 mb-12 bg-gray-100 border-b border-gray-100 transform transition duration-300 ease-in-out hover:-translate-y-2">
                        <h3 className="text-lg leading-normal mb-2 font-semibold text-black">Neurology</h3>
                        <p className="text-gray-500">This is a wider card with supporting text below as a natural content.</p>
                    </div>
                </div>
                <div className="fadeInUp" data-wow-duration="1s" data-wow-delay=".3s" style={{visibility:'visible', animationDuration: '1s', animationDelay:'0.3s', animationName:'fadeInUp'}}>
                    <div className="py-8 px-12 mb-12 bg-gray-100 border-b border-gray-100 transform transition duration-300 ease-in-out hover:-translate-y-2">
                        <h3 className="text-lg leading-normal mb-2 font-semibold text-black">Burn Treatment</h3>
                        <p className="text-gray-500">This is a wider card with supporting text below as a natural content.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Services