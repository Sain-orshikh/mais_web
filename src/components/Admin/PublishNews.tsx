import React from 'react'
import NewsEditor from './NewsEditor'

const PublishNews = () => {
  return (
    <>
      <div className='w-full h-full flex flex-row'>
        <div className='w-full h-full bg-white'>
          <NewsEditor />
        </div>
      </div>
    </>
  )
}

export default PublishNews
