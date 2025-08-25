import React from 'react'
/// This component renders a series of progress bars based on the number of items and the current step.
function ProgressBars({itemsCount, currentStep}) {
  return (
    <>
        {
            Array.from({ length: itemsCount }, (_, idx) => {
                const i = idx + 1;
                return (
                    <div key={i} className={`w-full h-2 rounded-full ${i <= currentStep ? 'bg-primary' : 'bg-gray-300'}`}>
                        <div className={`h-full rounded-full ${i === currentStep ? 'bg-primary-dark' : ''}`}></div>
                    </div>
                );
            })
        }
    </>
  )
}

export default ProgressBars