import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "Jane Austen"],
    answer: "Harper Lee",
  },
];

export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleNext(); // auto-advance on timeout
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQuestion]);

  const handleOptionClick = (option: string) => {
    setSelected(option);
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelected(null);
    setTimeLeft(15);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert(`Quiz complete! Your score: ${score}/${questions.length}`);
      setCurrentQuestion(0);
      setScore(0);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 text-blue-600">Quiz App</h1>
        <p className="text-sm text-gray-600">
          Question {currentQuestion + 1} of {questions.length}
        </p>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
          <div
            className="bg-blue-500 h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-1 text-red-500">Time Left: {timeLeft}s</p>
      </div>

      <Card className="rounded-2xl shadow-md border border-gray-200">
        <CardContent className="p-6 space-y-4">
          <motion.h2
            className="text-xl font-semibold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {questions[currentQuestion].question}
          </motion.h2>
          <div className="grid gap-2">
            {questions[currentQuestion].options.map((option) => (
              <Button
                key={option}
                variant={
                  selected === option
                    ? option === questions[currentQuestion].answer
                      ? "default"
                      : "destructive"
                    : "outline"
                }
                onClick={() => handleOptionClick(option)}
                disabled={!!selected}
              >
                {option}
              </Button>
            ))}
          </div>
          <Button
            onClick={handleNext}
            disabled={!selected}
            className="w-full mt-4"
          >
            Next
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}