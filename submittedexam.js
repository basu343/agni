// SubmittedExamPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarTeacher from '../../sidebarteacher';

const SubmittedExamPage = () => {
  const navigate = useNavigate();

  const examData = [
    { name: 'Basnta', subject: 'Mathematics', class: '10A', date: '2024-07-15', examType: 'MCQ', status: 'check' },
    { name: 'abc', subject: 'Science', class: '10B', date: '2024-07-16', examType: 'Subjective', status: 'check' },
    // Add more data as needed
  ];

  const handleCheckClick = (exam) => {
    if (exam.examType === 'Subjective') {
      navigate('/checksubjective');
    }
    // handle other exam types if necessary
  };

  return (
    <div className="flex h-screen">
      <SidebarTeacher />
      <div className="flex-1 max-w-6xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Submitted Exams</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border-b text-left">Name</th>
                <th className="px-4 py-2 border-b text-left">Subject</th>
                <th className="px-4 py-2 border-b text-left">Class</th>
                <th className="px-4 py-2 border-b text-left">Date</th>
                <th className="px-4 py-2 border-b text-left">Exam Type</th>
                <th className="px-4 py-2 border-b text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {examData.map((exam, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{exam.name}</td>
                  <td className="px-4 py-2 border-b">{exam.subject}</td>
                  <td className="px-4 py-2 border-b">{exam.class}</td>
                  <td className="px-4 py-2 border-b">{exam.date}</td>
                  <td className="px-4 py-2 border-b">{exam.examType}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleCheckClick(exam)}
                      className={`px-2 py-1 rounded-lg ${
                        exam.status === 'check' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                      }`}
                    >
                      {exam.status}
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

export default SubmittedExamPage;
