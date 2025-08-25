import { desc } from 'drizzle-orm'
import {React, useEffect, useState} from 'react'
import MaterialCardItem from './MaterialCardItem'
import axios from 'axios'
import { type } from 'os'
import Link from 'next/link'

function StudyMaterialSection({courseId, course}) {
    const [studyTypeContent, setstudyTypeContent] = useState()
    const MaterialList=[
        {
            name: 'Notes/chapters',
            description: 'Read notes to prepare for exam',
            icon: '/notes.png',
            path: '/notes',
            type: 'notes'
        },
        {
            name: 'flashcard',
            description: 'Flashcard to remember the concepts',
            icon: '/flashcard.png',
            path: '/flashcards',
            type: 'flashcard'
        },
        {
            name: 'Quiz',
            description: 'test your knowledge with a short quiz',
            icon: '/quiz.png',
            path: '/quiz',
            type: 'quiz'
        },
        {
            name: 'Question/Answer',
            description: 'Practice with question and answer',
            icon: '/qa.png',
            path: '/qa',
            type: 'qa'
        },
    ]

    const GetStudyMaterial = async () =>{
        const result = await axios?.post('/api/study-type', {
            courseId: courseId,
            studyType: 'ALL'
        })
        console.log("study material")
        console.log(result?.data)
        setstudyTypeContent(result?.data?.result)
    }
    useEffect(()=>{
        GetStudyMaterial()
    }, [])

    return (
        <div className='mt-5'>
            <h2 className='font-medium text-xl'>Study Material</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5'>
                {MaterialList.map((item, index)=>(
                    
                    <MaterialCardItem item={item} key={index}
                        studyTypeContent={studyTypeContent}
                        course = {course} refreshData={GetStudyMaterial}/>
                    
                ))}
            </div>
        </div>
    )
}

export default StudyMaterialSection