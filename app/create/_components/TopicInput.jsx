import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

function TopicInput({setTopic, setDifficultyLevel}) {
  return (
    <div className='flex flex-col gap-6'>
      <h2>Enter a topic or paste the content for which you want to generate study material</h2>
      <Textarea placeholder='Start writing here' onChange={(event)=> setTopic(event.target.value)}/>

      <h2>Select the difficulty level</h2>
      <Select onValueChange={(value) => setDifficultyLevel(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Difficulty Level"/>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Easy">Easy</SelectItem>
          <SelectItem value="Moderate">Moderate</SelectItem>
          <SelectItem value="Hard">Hard</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default TopicInput