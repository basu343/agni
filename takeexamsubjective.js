import React, { useState, useEffect, useRef } from "react";
import SidebarStudent from "../../sidebarStudent";
import { supabase } from "../../createClient";

const SubjectiveExamPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // Example: 5 minutes per question
  const textareaRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchSubjectiveQuestions = async () => {
      try {
        const { data, error } = await supabase
          .from("subjectivequestions")
          .select("*");
        if (error) {
          console.error("Error fetching subjective questions:", error.message);
          return;
        }
        setQuestions(data || []);
      } catch (error) {
        console.error(
          "Unexpected error fetching subjective questions:",
          error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSubjectiveQuestions();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (tabSwitchCount < 2) {
          setTabSwitchCount((prev) => prev + 1);
          alert(
            `Warning: Tab switch detected. You have ${
              2 - tabSwitchCount
            } switches left.`
          );
        } else {
          handleSubmit();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [tabSwitchCount]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [answers, currentQuestionIndex]);

  useEffect(() => {
    if (timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [timeLeft]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    console.log("Exam submitted with answers:", answers);
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(300); // Reset timer for the next question
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTimeLeft(300); // Reset timer for the previous question
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    alert("Pasting is not allowed.");
  };

  const navigateToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setTimeLeft(300); // Reset timer for the selected question
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <SidebarStudent />
        <div className="flex-1 p-6 bg-white">
          <div className="container mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Loading...
            </h1>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex h-screen bg-gray-100">
        <SidebarStudent />
        <div className="flex-1 p-6 bg-white">
          <div className="container mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Exam Submitted
            </h1>
            <p className="text-lg text-gray-700">
              Thank you for completing the exam. Your answers have been
              submitted.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarStudent />
      <div className="flex-1 p-6 bg-white">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Subjective Exam
          </h1>

          {/* Question Navigation Calendar */}
          <div className="mb-6 grid grid-cols-5 gap-2">
            {questions.map((question, index) => (
              <button
                key={question.ID}
                onClick={() => navigateToQuestion(index)}
                className={`p-2 rounded-md ${
                  answers[question.ID]
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                Question {index + 1}
              </button>
            ))}
          </div>

          <form>
            <div className="mb-6">
              <p className="text-xl font-semibold text-gray-800 mb-2">
                {currentQuestionIndex + 1}. {currentQuestion.QUESTIONS}
              </p>
              <textarea
                rows="5"
                placeholder="Type your answer here..."
                value={answers[currentQuestion.ID] || ""}
                onChange={(e) =>
                  handleAnswerChange(currentQuestion.ID, e.target.value)
                }
                onPaste={handlePaste}
                ref={textareaRef}
                className="w-full p-3 border border-gray-300 rounded-md resize-none overflow-hidden"
                disabled={timeLeft <= 0}
              />
              <div className="text-right text-red-500">
                {timeLeft > 0 ? `Time left: ${timeLeft}s` : "Time's up!"}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600"
                disabled={currentQuestionIndex === 0 || timeLeft <= 0}
              >
                Previous
              </button>
              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
                  disabled={timeLeft <= 0}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubjectiveExamPage;
