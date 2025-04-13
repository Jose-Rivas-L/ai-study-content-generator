import React from 'react'

function ChapterList({chapters}) {
  return (
    <div className='mt-5'>
        <h2 className='font-medium text-xl'>Chapters</h2>
        <div className='mt-5 '>
            {chapters?.map((chapter, index)=>(
                <div className='flex gap-5 items-center p-4 border shadow-md mb-2 rounded-md cursor-pointer' key={index}>
                   <h2 className='flex gap-5 items-center'>{chapter?.emoji}</h2> 
                   <div>
                    <h2 className='font-medium'>{chapter?.chapter_title}</h2>
                    <p className='text-gray-400 text-sm'>{chapter?.chapter_summary}</p>
                   </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ChapterList