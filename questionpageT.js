import React, { useState, useEffect } from 'react';
import SidebarTeacher from '../sidebarteacher';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../createClient';


const QuestionPageT = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from('objectivequestions') // Replace with your table name
        .select('*');

      if (error) {
        console.error('Error fetching questions:', error.message);
      } else {
        setQuestions(data);
      }
    };

    fetchQuestions();
  }, []);

  const handleAddQuestion = () => {
    navigate('/questionsT'); 
  };

  const handleEditQuestion = (index) => {
    console.log(`Editing question at index ${index}`);
    // Logic for editing a question
  };

  const handleViewDetails = (index) => {
    console.log(`Viewing details of question at index ${index}`);
    // Logic for viewing details of a question
  };

  return (
    <div className="flex h-screen">
      <SidebarTeacher />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Questions</h1>
        <button
          onClick={handleAddQuestion}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Add Question
        </button>
        <div className="overflow-auto">
          <table className="w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Lecturer</th>
                <th className="py-2 px-4 border">Subject</th>
                <th className="py-2 px-4 border">Class</th>
                <th className="py-2 px-4 border">Question Type</th>
                <th className="py-2 px-4 border">Created Date</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border">{question.LECTURER}</td>
                  <td className="py-2 px-4 border">{question.SUBJECT}</td>
                  <td className="py-2 px-4 border">{question.CLASS}</td>
                  <td className="py-2 px-4 border">{question.QUESTION_TYPE}</td>
                  <td className="py-2 px-4 border">{question.CREATED_DATE}</td>
                  <td className="py-2 px-4 border space-x-2">
                    <button
                      onClick={() => handleEditQuestion(index)}
                      className="px-2 py-1 text-xs md:text-sm bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleViewDetails(index)}
                      className="px-2 py-1 text-xs md:text-sm bg-green-500 text-white rounded hover:bg-green-700"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuestionPageT;
