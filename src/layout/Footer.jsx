import React from 'react'

function Footer() {
  return (
    <div>
    <div className='p-5 flex flex-wrap gap-5 md:flex md:justify-center md:mt-10'>
      <div className='w-64 '>
        <h1 className='text-2xl font-medium '>write blog</h1>
        <p className='text-gray-500'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus, necessitatibus.
        </p>
      </div>
      <div className='w-44 '>
        <h1 className='text-2xl font-medium '>Plateform</h1>
        <p className='text-gray-500'>How its Work</p>
        <p className='text-gray-500'>Interested blog</p>
        <p className='text-gray-500'>Fraud</p>
        <p className='text-gray-500'>Protection</p>
        <p className='text-gray-500'>Post</p>
        <p className='text-gray-500'>Account</p>
      </div>
      <div className='w-44 '>
        <h1 className='text-2xl font-medium '>Learn</h1>
        <p className='text-gray-500'>Resources</p>
        <p className='text-gray-500'>Blog</p>
        <p className='text-gray-500'>FAQs</p>
      </div>
      <div className='w-44 '>
        <h1 className='text-2xl font-medium '>About</h1>
        <p className='text-gray-500'>Careers</p>
        <p className='text-gray-500'>Team</p>
        <p className='text-gray-500'>News & Press</p>
      </div>
      <div className='w-64 '>
        <h1 className='text-2xl font-medium '>Contact Us</h1>
      </div>
    </div>
      <div className='text-center text-xl bg-blue-600 py-4 text-gray-800'>Thanks for colabrate</div>
    </div>
  )
}

export default Footer