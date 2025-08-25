"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import PreviousButton from "../_components/PreviousButton";
import ProgressBars from "../_components/ProgressBars";
import NextButton from "../_components/NextButton";

function ViewNotes() {
  const { courseId } = useParams();
  const [notes, setNotes] = useState();
  const [stepCount, setStepCount] = useState(0);
  const route = useRouter();
  const GetNotes = async () => {
    const result = await axios?.post("/api/study-type", {
      courseId: courseId,
      studyType: "notes",
    });
    console.log(result?.data);
    setNotes(result?.data);
  };
  useEffect(() => {
    GetNotes();
  }, []);

  return (
    notes && (
      <div>
        <div className="flex gap-5 items-center">
          <PreviousButton stepCount={stepCount} setStepCount={setStepCount} />

          <ProgressBars currentStep={stepCount} itemsCount={notes?.length} />

          <NextButton
            stepCount={stepCount}
            setStepCount={setStepCount}
            lastStep={notes?.length}
          />
        </div>
        <div className="mt-10">
          <div dangerouslySetInnerHTML={{ __html: notes[stepCount]?.notes }} />
          {notes?.length == stepCount && (
            <div className="flex flex-col items-center justify-center gap-10">
              <h2>End of Notes</h2>
              <Button onClick={() => route.back()}>Go to Course Page</Button>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default ViewNotes;
