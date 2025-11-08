import React from "react";
import Quiz from "react-quiz-component";


const quiz = {
  quizTitle: "Medical Terms Quiz",
  questions: [
    { question: "What does Ejection Fraction mean?", questionType: "text", correctAnswer: "Percentage of blood pumped" },
    { question: "Is Atrial Fibrillation an irregular heartbeat?", questionType: "text", correctAnswer: "Yes" }
  ]
};

export default function HealthQuiz() {
  return <Quiz quiz={quiz} />;
}
