import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { useState } from 'react'

function QuizLayout({quiz, CheckAnswer}) {
  const [selectedOption, setSelectedOption] = useState([])

  useEffect(() => {
    setSelectedOption([])
  }, [quiz])
  
  const handleSelectOption = (index, isMultiSelect) => {
    if(isMultiSelect){
      if(selectedOption?.includes(index)){
        setSelectedOption(selectedOption.filter((i)=> i!==index))
      }else{
        setSelectedOption([...selectedOption, index])
      }
    }else{
      setSelectedOption([index])
    }
  }

  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-5">
          <h2 className="font-medium text-3xl text-center">
            {quiz?.question}
          </h2>
          <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-5">
            {quiz?.options.map((option, index) => (
            <Button key={index}
            onClick={()=>{handleSelectOption(index, quiz?.multiSelect);
            }}
            variant="outline"
            className={`w-full p-3 px-4 hover:bg-gray-200 cursor-pointer ${selectedOption.includes(index)===true&&'bg-primary text-white hover:bg-gray-200'}`}
            >{option}
            </Button>
            ))}
          </div>
          <Button 
          onClick = {() => CheckAnswer(selectedOption)}
          disabled={selectedOption.length===0}
          className='mt-5'>
            Check answer
            </Button>
    </div>
  )
}

export default QuizLayout