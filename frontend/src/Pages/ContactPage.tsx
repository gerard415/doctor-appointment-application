import React from 'react'

const ContactPage = () => {
  return (
    <div className="w-full  ">
      <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12 ">
          <div className=" w-full border rounded p-8 sm:p-12">
              <p className="text-3xl font-bold leading-7 text-center ">Send Us a Message</p>
              <form action="" method="post">
                  <div className="md:flex items-center mt-12">
                      <div className="w-full md:w-1/2 flex flex-col">
                          <label className="font-semibold leading-none ">Name</label>
                          <input type="text" className="leading-none  p-3 focus:outline-none mt-4 border-0 bg-gray-100  rounded" />
                      </div>
                      <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                          <label className="font-semibold leading-none ">Phone</label>
                          <input type="email" className="leading-none text-gray-50 p-3 focus:outline-none mt-4 border-0 bg-gray-100 rounded"/>
                      </div>
                  </div>
                  <div className="md:flex items-center mt-8">
                      <div className="w-full flex flex-col">
                          <label className="font-semibold leading-none ">Subject</label>
                          <input type="text" className="leading-none text-gray-50 p-3 focus:outline-none mt-4 border-0 bg-gray-100 rounded"/>
                      </div>
                      
                  </div>
                  <div>
                      <div className="w-full flex flex-col mt-8">
                          <label className="font-semibold leading-none ">Message</label>
                          <textarea typeof="text" className="h-40 text-base leading-none text-gray-50 p-3 focus:outline-none mt-4 bg-gray-100 border-0 rounded"></textarea>
                      </div>
                  </div>
                  <div className="flex items-center justify-center w-full">
                      <button className="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none">
                          Send message
                      </button>
                  </div>
              </form>
          </div>
      </div>
    </div>
  )
}

export default ContactPage