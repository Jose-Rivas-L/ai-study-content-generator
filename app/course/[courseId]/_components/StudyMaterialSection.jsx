import { desc } from 'drizzle-orm'
import React from 'react'
import MaterialCardItem from './MaterialCardItem'

function StudyMaterialSection() {
    const MaterialList=[
        {
            name: 'Notes/chapters',
            description: 'Read notes to prepare for exam',
            icon: '/notes.png',
            path: '/notes'
        },
        {
            name: 'flashcard',
            description: 'Flashcard to remember the concepts',
            icon: '/flashcard.png',
            path: '/flashcards'
        },
        {
            name: 'Quiz',
            description: 'test your knowledge with a short quiz',
            icon: '/quiz.png',
            path: '/quiz'
        },
        {
            name: 'Question/Answer',
            description: 'Practice with question and answer',
            icon: '/qa.png',
            path: '/qa'
        },
    ]

    return (
        <div className='mt-5'>
            <h2 className='font-medium text-xl'>Study Material</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5'>
                {MaterialList.map((item, index)=>(
                    <MaterialCardItem item={item} key={index}/>
                ))}
            </div>
        </div>
    )
}

export default StudyMaterialSection