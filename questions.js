import React, { useState, useEffect } from 'react';

import { supabase } from '../createClient';
import Sidebar from '../sidebar';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

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

  const handleViewDetails = async (index) => {
    const question = questions[index];
    const { data, error } = await supabase
      .from('objectivequestions')
      .select('*')
      .eq('SUBJECT', question.SUBJECT) // Adjust this based on unique identifiers
      .single(); // Assuming SUBJECT is unique for each question

    if (error) {
      console.error('Error fetching question details:', error.message);
    } else {
      setSelectedQuestion(data);
      console.log(`Viewing details of question with subject ${question.SUBJECT}`);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar/>
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Questions</h1>

        {selectedQuestion ? (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Question Details</h2>
            <div className="p-4 bg-gray-100 border rounded">
              <p><strong>Lecturer:</strong> {selectedQuestion.LECTURER}</p>
              <p><strong>Subject:</strong> {selectedQuestion.SUBJECT}</p>
              <p><strong>Class:</strong> {selectedQuestion.CLASS}</p>
              <p><strong>Question Type:</strong> {selectedQuestion.QUESTION_TYPE}</p>
              <p><strong>Created Date:</strong> {selectedQuestion.CREATED_DATE}</p>
              <p><strong>Questions:</strong> {selectedQuestion.QUESTIONS}</p> {/* Adjust based on your schema */}
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Questions;
