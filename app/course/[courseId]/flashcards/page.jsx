"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PreviousButton from "../_components/PreviousButton";
import NextButton from "../_components/NextButton";
import ProgressBars from "../_components/ProgressBars";
import ReactCardFlip from "react-card-flip";

function Flashcards() {
  const { courseId } = useParams();
  const [flashcards, setFlashcards] = useState();
  const [stepCount, setStepCount] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  const route = useRouter();
  const GetFlashcards = async () => {
    const result = await axios?.post("/api/study-type", {
      courseId: courseId,
      studyType: "flashcard",
    });
    console.log(result?.data);
    setFlashcards(result?.data?.content);
  };
  useEffect(() => {
    GetFlashcards();
  }, []);

  return (
    flashcards && (
      <div>
        <div className="flex gap-5 items-center">
          <PreviousButton stepCount={stepCount} setStepCount={setStepCount} />

          <ProgressBars
            currentStep={stepCount}
            itemsCount={flashcards?.length}
          />

          <NextButton
            stepCount={stepCount}
            setStepCount={setStepCount}
            lastStep={flashcards?.length}
          />
        </div>
        <div className="mt-10 flex flex-col items-center justify-center">
        { /*TODO: Refactor this code to a reausable component*/}
          {flashcards?.length != stepCount ? (
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" className={`mt-10  flex items-center justify-center cursor-pointer ${isFlipped?'bg-primary':'bg-secondary'}`}>
              <div className="flex flex-col items-center justify-center gap-5 w-[300px] h-96 rounded-lg shadow-lg cursor-pointer bg-primary-light">
                <p className="text-gray-800 text-md text-center">
                  {flashcards[stepCount]?.front}
                </p>
                <button onClick={handleClick} className="absolute bottom-5">Click to flip</button>
              </div>

              <div className="flex flex-col items-center justify-center gap-5 w-[300px] h-96 rounded-lg shadow-lg cursor-pointer bg-muted">
                <p className="text-gray-800 text-md text-center">
                  {flashcards[stepCount]?.back}
                </p>
                <button onClick={handleClick} className="absolute bottom-5">Click to flip</button>
              </div>
            </ReactCardFlip>
          ) : (
            <div className="flex flex-col items-center justify-center gap-10">
              <h2>End of flashcards</h2>
              <Button onClick={() => route.back()}>Go to Course Page</Button>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default Flashcards;
