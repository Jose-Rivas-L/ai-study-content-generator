'use client'
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import CourseCardItem from './CourseCardItem';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { RefreshCcw, RefreshCw } from 'lucide-react';

function CourseList() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const {user} = useUser();
    useEffect(() => {
        user&&GetCourseList();
    }, [user])

    const GetCourseList=async ()=>{
        setLoading(true);
        const result = await axios.post('/api/courses',
            {createdBy: user?.primaryEmailAddress?.emailAddress});

        setCourses(result.data.result);
        setLoading(false);
    }
  return (
    <div className='mt-10'>
        <h2 className='font-bold text-2xl flex justify-between items-center'>
            Your Study Material
            <Button variant='outline' 
            onClick={GetCourseList}
            className='border-primary text-primary'><RefreshCw/> Refresh</Button>
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2'>
            {loading==false? courses.map((course, index)=>(
                <CourseCardItem course={course} key={index}/>
            )):
            [1,2,3,4,5,6].map((item, index)=>(
                <div className='h-56 w-full bg-slate-200 rounded-lg animate-pulse' key={index}>
                    
                </div>
            ))
            }
        </div>
    </div>
  )
}

export default CourseList