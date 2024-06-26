import React from 'react'

const Loader = () => {
  return (
    <div className='flex-center fixed top-0 left-0 right-0 w-full h-full bg-white z-[10000]'>
          <div className='w-10 h-10 border-primary border-[5px] border-solid border-r-transparent rounded-full animate-spin'>

          </div>
    </div>
  )
}

export default Loader