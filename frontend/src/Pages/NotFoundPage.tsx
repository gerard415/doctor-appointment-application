import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
        <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
            <div className="flex flex-col items-center pt-8 sm:justify-start sm:pt-0 space-y-5">
                <div className='flex'>
                    <div className="px-4 text-lg text-gray-500 border-r border-gray-400 tracking-wider">
                        404
                    </div>
                    <div className="ml-4 text-lg text-gray-500 uppercase tracking-wider">
                        Not Found
                    </div>
                </div>
                
                <Link to={'/'} className="px-6 border border-gray-400 text-gray-500 hover:text-white hover:bg-gray-500 font-semibold py-3">
                            RETURN TO HOME
                </Link>
            </div>
            
        </div>
    </div>
  )
}

export default NotFoundPage