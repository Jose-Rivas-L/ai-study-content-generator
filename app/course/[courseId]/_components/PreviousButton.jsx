import { Button } from "@/components/ui/button";
import React from "react";

function PreviousButton({stepCount, setStepCount}) {
  return (
    <div>
      {stepCount != 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStepCount(stepCount - 1)}
        >
          Previous
        </Button>
      )}
    </div>
  );
}

export default PreviousButton;
