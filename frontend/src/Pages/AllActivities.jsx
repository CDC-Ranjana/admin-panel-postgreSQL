import React from 'react'

const AllActivities = () => {
  return (
    <div className='bg-[#F1F5F9] h-screen'>
    <div className=''>
      <div className='px-12'> 
        <h2 className='text-center pt-12 text-4xl border-b'>All Activites Stats</h2>
        <div className='flex justify-between pt-12'>
          <div className='bg-white w-[25%] p-4'>
            <h1 className='text-4xl'>234+</h1>
            <p>All recent post</p>
          </div>
            <div className='bg-white w-[25%] p-4'>
              <h1 className='text-4xl'>234+</h1>
            <p>All bulletines</p>
          </div>
            <div className='bg-white w-[25%] p-4'>
              <h1 className='text-4xl'>234+</h1>
            <p>All admins</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AllActivities