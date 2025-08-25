"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PreviousButton from "../_components/PreviousButton";
import NextButton from "../_components/NextButton";
import ProgressBars from "../_components/ProgressBars";
import QuizLayout from "./_components/QuizLayout";

function ViewQuiz() {
  const { courseId } = useParams();
  const [quiz, setQuiz] = useState();
  const [stepCount, setStepCount] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const CheckAnswer = (selectedOption, currentQuestion) => {
    console.log("selected option", selectedOption);
    console.log("current question", currentQuestion);
    setCorrectAnswer(
        Array.isArray(selectedOption) && Array.isArray(currentQuestion.answer)
          ? selectedOption.length === currentQuestion.answer.length &&
        selectedOption.every((val) => currentQuestion.answer.includes(val))
          : selectedOption === currentQuestion.answer
      );
  };

  const route = useRouter();
  const GetQuiz = async () => {
    const result = await axios?.post("/api/study-type", {
      courseId: courseId,
      studyType: "Quiz",
    });
    console.log(result?.data);
    setQuiz(result?.data?.content);
  };
  useEffect(() => {
    GetQuiz();
    setCorrectAnswer(null);
  }, [stepCount]);

  return (
    quiz && (
      <div>
        <div className="flex gap-5 items-center">
          <PreviousButton stepCount={stepCount} setStepCount={setStepCount} />

          <ProgressBars
            currentStep={stepCount}
            itemsCount={quiz?.questions?.length}
          />

          <NextButton
            stepCount={stepCount}
            setStepCount={setStepCount}
            lastStep={quiz?.questions?.length}
          />
        </div>
        <QuizLayout
          quiz={quiz?.questions[stepCount]}
          CheckAnswer={(a)=> CheckAnswer(a, quiz?.questions[stepCount])}
        />

        <div>
          {correctAnswer != null && (
            <div
              className={`mt-5 p-5 text-center rounded-md ${
                correctAnswer ? "bg-green-200" : "bg-red-200"
              }`}
            >
              {correctAnswer
                ? "Correct Answer! Well done."
                : `Wrong Answer! The correct answer is: ${quiz?.questions[stepCount].answer}`}
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default ViewQuiz;
