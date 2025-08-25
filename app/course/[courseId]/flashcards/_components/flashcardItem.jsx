import React, { useState } from 'react'

function FlashcardItem({item}) {
    const [side, setSide] = useState('front')
    const handleClick = () => {
        setSide(side === 'front' ? 'back' : 'front')
    }
  return (
    <div onClick={handleClick} className={`mt-10 w-[50%] h-96 rounded-lg bg-white shadow-lg flex items-center justify-center cursor-pointer ${side=='front'?'bg-primary':'bg-secondary'}`}>
        {side === 'front' ? (
                <div className='flex flex-col items-center justify-center gap-5'>
                    <p className='text-gray-800 text-md text-center'>{item?.front}</p>
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center gap-5'>
                    <h2 className='text-xl font-medium text-center'>{item?.back}</h2>
                </div>
            )}
    </div>
  )
}

export default FlashcardItem