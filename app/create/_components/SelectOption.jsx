import Image from 'next/image'
import React, { useState } from 'react'

function SelectOption({selectedStudyType}) {
    const Options=[
        {
            name:'Exam',
            icon:'/exam_1.png'
        },
        {
            name:'Job Interview',
            icon:'/job.png'
        },
        {
            name:'Practice',
            icon:'/practice.png'
        },
        {
            name:'Coding Prep',
            icon:'/code.png'
        },
        {
            name:'Other',
            icon:'/knowledge.png'
        }
    ]
    const [selectedOption, setSelectedOption] = useState();

  return (
    <div className=''>
        <h2 className='text-center font-bold text-lg'>For which you want to create your personal study material</h2>
        <div className='grid gap-2 grid-cols-2 mt-5 md:grid-cols-3 lg:grid-cols-5'>
            {Options.map((opt, index)=>(
                <div key={index} 
                className={`p-4 flex flex-col items-center justify-center 
                border rounded-xl hover:border-primary cursor-pointer
                ${opt?.name==selectedOption&&'border-primary'}`}
                onClick={()=> {setSelectedOption(opt.name); selectedStudyType(opt.name)}}>
                    <Image src={opt.icon} alt={opt.name} width={50} height={50}/>
                    <h2 className='text-sm mt-2'>{opt.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SelectOption