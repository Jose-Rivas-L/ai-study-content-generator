import { Button } from '@/components/ui/button'
import axios from 'axios'
import { RefreshCcw } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner'

function MaterialCardItem({item, studyTypeContent, course, refreshData}) {

const [loading, setLoading] = useState(false)

  const GenerateContent = async () =>{
    toast('Generating the content for your study material')
    setLoading(true)
    let chapters = ''
    course?.courseLayout?.chapters.forEach((chapter)=>{
      chapters = chapter.chapter_title+ ','+chapters
    })
    console.log("type:", item.name)
    const result = await axios.post('/api/study-type-content', {
      courseId: course?.courseId,
      type : item.name,
      chapters: chapters,
    })
    setLoading(false)
    refreshData(true)
    toast('Your content study material is ready')
  }
  return (
    <div className={`border shadow-md rounded-md p-5 flex flex-col items-center
      ${studyTypeContent?.[item.type]==null&&'grayscale'}
    `}>
      {studyTypeContent?.[item.type]==null?
      <h2 className='p-1 px-2 bg-gray-500 text-white rounded-full text-[10px] mb-2'>Generate</h2>:
      <h2 className='p-1 px-2 bg-green-500 text-white rounded-full text-[10px] mb-2'>Ready</h2>
      }
        
        <Image src={item.icon} alt={item.name} width={50} height={50}/>
        <h2 className='font-medium mt-3'>{item.name}</h2>
        <p className='text-gray-500 text-sm text-center'>{item.description}</p>
        {studyTypeContent?.[item.type]==null? 
        <Button className='mt-3 w-full' onClick={() => GenerateContent()}>
          {loading&& <RefreshCcw className='animate-spin'/>}Generate</Button>
        :
        <Link href={'/course/'+ course?.courseId+item.path}>
          <Button className='mt-3'>View</Button>
        </Link>
        }
    </div>
  )
}

export default MaterialCardItem