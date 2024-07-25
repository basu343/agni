// CheckSubjectivePage.js

import React, { useState } from 'react';
import SidebarTeacher from '../../sidebarteacher';

const CheckSubjectivePage = () => {
  // Assuming these details would be fetched from an API
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: 'What is the capital of France?',
      studentAnswer: 'The capital of France is Paris.',
      marks: ''
    },
    {
      id: 2,
      question: 'Explain the theory of relativity.',
      studentAnswer: 'The theory of relativity is about...',
      marks: ''
    }
    // Add more questions as needed
  ]);

  const handleMarksChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].marks = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API call to save marks)
    console.log(questions);
  };

  return (
    <div className="flex h-screen">
      <SidebarTeacher />
      <div className="flex-1 max-w-4xl mx-auto mt-4 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-2">Check Subjective Answers</h2>
        <form onSubmit={handleSubmit}>
          {questions.map((q, index) => (
            <div key={q.id} className="mb-4">
              <div className="mb-2">
                <label htmlFor={`question-${q.id}`} className="block text-gray-700 font-bold text-sm mb-1">Question:</label>
                <textarea
                  id={`question-${q.id}`}
                  className="w-full px-2 py-1 border rounded-lg text-sm"
                  value={q.question}
                  readOnly
                />
              </div>
              <div className="mb-2">
                <label htmlFor={`studentAnswer-${q.id}`} className="block text-gray-700 font-bold text-sm mb-1">Student's Answer:</label>
                <textarea
                  id={`studentAnswer-${q.id}`}
                  className="w-full px-2 py-1 border rounded-lg text-sm"
                  value={q.studentAnswer}
                  readOnly
                />
              </div>
              <div className="mb-2">
                <label htmlFor={`marks-${q.id}`} className="block text-gray-700 font-bold text-sm mb-1">Assign Marks:</label>
                <input
                  id={`marks-${q.id}`}
                  type="number"
                  className="w-full px-2 py-1 border rounded-lg text-sm"
                  value={q.marks}
                  onChange={(e) => handleMarksChange(index, e.target.value)}
                  required
                />
              </div>
            </div>
          ))}
          <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm">Submit Marks</button>
        </form>
      </div>
    </div>
  );
};

export default CheckSubjectivePage;
