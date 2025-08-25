import { Button } from '@/components/ui/button';
import React from 'react'

function NextButton({stepCount, setStepCount, lastStep}) {
  return (
    <div>
      {stepCount < lastStep && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStepCount(stepCount + 1)}
        >
          Next
        </Button>
      )}
    </div>
  );
}

export default NextButton