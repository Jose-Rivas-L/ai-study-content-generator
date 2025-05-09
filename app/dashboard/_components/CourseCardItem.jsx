import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RefreshCcw } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CourseCardItem({course}) {
  return (
    <div className="border rounded-lg shadow-md p-4">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <Image src={"/knowledge.png"} alt="other" width={50} height={50} />
          <h2 className="text-[10px] p-1 px-2 rounded-full bg-primary text-white">
            creation date
          </h2>
        </div>
        <h2 className="font-medium text-lg">
          {course.courseLayout?.course_title}
        </h2>
        <p className="text-sm line-clamp-2 text-gray-500">
          {course?.courseLayout?.course_summary}
        </p>

        <div>
          <Progress value={0} />
        </div>
        <div className="flex justify-end">
          {course?.status == "Generating" ? (
            <h2 className="text-[12px] p-1 px-2 flex gap-2 items-center rounded-full bg-gray-400 text-white">
              <RefreshCcw className="h-5 w-5 animate-spin" />
              Generating...
            </h2>
          ) : (
            <Link href={`/course/${course?.courseId}`}>
              <Button>View</Button>
            </Link> 
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCardItem