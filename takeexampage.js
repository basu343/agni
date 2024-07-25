import React, { useState, useEffect } from "react";
import SidebarStudent from "../../sidebarStudent";
import { supabase } from "../../createClient";
import { useLocation } from "react-router-dom";

const TakeExamPage = () => {
  const location = useLocation();
  const { examId, subject, class: examClass } = location.state || {}; // Get examId, subject, and class from state

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timers, setTimers] = useState([]);
  const [examDetails, setExamDetails] = useState(null);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const { data, error } = await supabase
          .from("exam")
          .select("*")
          .eq("ID", examId)
          .single();

        if (error) {
          console.error("Error fetching exam details:", error.message);
          return;
        }

        setExamDetails(data);
      } catch (error) {
        console.error("Unexpected error fetching exam details:", error.message);
      }
    };

    fetchExamDetails();
  }, [examId]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data, error } = await supabase
          .from("objectivequestions")
          .select("*")
          .eq("SUBJECT", subject)
          .eq("CLASS", examClass);
          
          

        if (error) {
          console.error("Error fetching questions:", error.message);
          return;
        }

        if (!data || data.length === 0) {
          console.warn("No questions found for the specified subject and class.");
          return;
        }

        setQuestions(data);
        const initialTimers = data.map(() => 30);
        setTimers(initialTimers);
      } catch (error) {
        console.error("Unexpected error fetching questions:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [subject, examClass]);

  useEffect(() => {
    if (questions.length === 0) return;

    const timerId = setInterval(() => {
      setTimers((prevTimers) => {
        const updatedTimers = [...prevTimers];
        if (updatedTimers[currentQuestionIndex] > 0) {
          updatedTimers[currentQuestionIndex] -= 1;
        }

        if (updatedTimers[currentQuestionIndex] <= 0) {
          clearInterval(timerId);
          const nextIndex = currentQuestionIndex + 1;
          if (nextIndex < questions.length) {
            setCurrentQuestionIndex(nextIndex);
          }
          return updatedTimers;
        }

        return updatedTimers;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [currentQuestionIndex, questions]);

  const handleAnswerChange = (questionId, answer) => {
    if (timers[currentQuestionIndex] > 0) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: answer,
      }));
    }
  };

  const handleSubmit = async () => {
    if (questions.length === 0 || !examDetails) return;

    let score = 0;

    for (const question of questions) {
      const userAnswer = answers[question.ID];
      const correctAnswer = question.CORRECT_ANSWER;

      if (userAnswer === correctAnswer) {
        score += 1;
      }
    }

    const totalQuestions = questions.length;
    const percentage = (score / totalQuestions) * 100;

    const resultFeedback = percentage >= 40 ? "Pass" : "Fail";
    const feedbackMessage = percentage >= 40 ? "Good job!" : "Better luck next time!";

    await supabase
      .from("result")
      .insert({
        
        EXAM_NAME: examDetails.EXAM_NAME,
        EXAM_DATE: examDetails.DATE,
        CLASS: examDetails.CLASS,
        SUBJECT: subject,
        EXAM_TYPE: 'MCQ',
        TOTAL_MARKS: totalQuestions,
        OBTAIN_MARKS: score,
        RESULT: resultFeedback,
        FEEDBACK: feedbackMessage,
      });

    setResult({
      score,
      totalQuestions,
      percentage,
      feedbackMessage,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const navigateToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

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

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <SidebarStudent />
        <div className="flex-1 p-6 bg-white">
          <div className="container mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Take Exam</h1>
            <p className="text-gray-600">Loading questions...</p>
          </div>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="flex h-screen bg-gray-100">
        <SidebarStudent />
        <div className="flex-1 p-6 bg-white shadow-lg rounded-lg">
          <div className="container mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Exam Result
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              You answered {result.score} out of {result.totalQuestions}{" "}
              questions correctly.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Your score: {result.percentage.toFixed(2)}
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Feedback: {result.feedbackMessage}
            </p>
            <button
              onClick={() => setResult(null)}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Take Another Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex] || {};

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarStudent />
      <div className="flex-1 p-6 bg-white shadow-lg rounded-lg">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Take Exam</h1>

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
                } ${
                  currentQuestionIndex === index ? "border border-blue-500" : ""
                }`}
              >
                Question {index + 1}
              </button>
            ))}
          </div>

          <form>
            {currentQuestion ? (
              <div className="mb-6">
                <p className="text-xl font-semibold text-gray-800 mb-2">
                  Question {currentQuestionIndex + 1}:{" "}
                  {currentQuestion.QUESTION}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Time Left: {timers[currentQuestionIndex] || 0} seconds
                </p>
                <div className="space-y-2">
                  {[
                    currentQuestion.OPTION_1,
                    currentQuestion.OPTION_2,
                    currentQuestion.OPTION_3,
                    currentQuestion.OPTION_4,
                  ].map((option, index) => (
                    <label key={index} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`question-${currentQuestion.ID}`}
                        value={option}
                        checked={answers[currentQuestion.ID] === option}
                        onChange={() =>
                          handleAnswerChange(currentQuestion.ID, option)
                        }
                        className="form-radio text-blue-500"
                        disabled={timers[currentQuestionIndex] <= 0}
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              <p>No questions available</p>
            )}
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={handlePrevious}
                className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-400"
                disabled={
                  currentQuestionIndex === 0 ||
                  timers[currentQuestionIndex] <= 0
                }
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600"
                disabled={
                  currentQuestionIndex === questions.length - 1 ||
                  timers[currentQuestionIndex] <= 0
                }
              >
                Next
              </button>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 mt-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TakeExamPage;
