// src/pages/OnlineExam.js

import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { supabase } from '../createClient'; // Adjust the import path as necessary
import Sidebar from '../sidebar';

const OnlineExam = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);

  // Fetch exams from Supabase
  useEffect(() => {
    const fetchExams = async () => {
      const { data, error } = await supabase
        .from('exam')
        .select('*'); // Adjust the columns as needed

      if (error) {
        console.error('Error fetching exams:', error.message);
      } else {
        const now = new Date();
        const updatedExams = data.map((exam) => {
          const examDateTime = new Date(`${exam.DATE}T${exam.TIME}`);
          const updatedStatus = examDateTime <= now;
          return { ...exam, STATUS: updatedStatus };
        });

        setExams(updatedExams);
        // Perform initial status update
        await updateExamStatuses(updatedExams);
      }
    };

    fetchExams();

    // Set an interval to regularly check and update exam statuses
    const intervalId = setInterval(async () => {
      const { data, error } = await supabase
        .from('exam')
        .select('*');
      if (!error) {
        const now = new Date();
        const updatedExams = data.map((exam) => {
          const examDateTime = new Date(`${exam.DATE}T${exam.TIME}`);
          const updatedStatus = examDateTime <= now;
          return { ...exam, STATUS: updatedStatus };
        });

        setExams(updatedExams);
        await updateExamStatuses(updatedExams);
      }
    }, 60000); // Check every minute

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Function to update exam statuses
  const updateExamStatuses = async (exams) => {
    const now = new Date();
    const updates = exams
      .map(async (exam) => {
        const examDateTime = new Date(`${exam.DATE}T${exam.TIME}`);
        const updatedStatus = examDateTime <= now;

        if (exam.STATUS !== updatedStatus) {
          const { error } = await supabase
            .from('exam')
            .update({ STATUS: updatedStatus })
            .eq('ID', exam.id);

          if (error) {
            console.error('Error updating exam status:', error.message);
          }
        }
      });

    await Promise.all(updates); // Wait for all updates to complete
  };

  // Function to toggle status manually (if needed)
  const toggleStatus = async (id) => {
    const exam = exams.find((exam) => exam.id === id);
    const updatedStatus = !exam.STATUS;

    const { error } = await supabase
      .from('exam')
      .update({ STATUS: updatedStatus }) // Adjust the column name as needed
      .eq('ID', id);

    if (error) {
      console.error('Error updating exam status:', error.message);
    } else {
      setExams(
        exams.map((exam) =>
          exam.id === id ? { ...exam, STATUS: updatedStatus } : exam
        )
      );
    }
  };

 
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Online Exams</h1>
        
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Exam Name</th>
              <th className="py-2">Subject</th>
              <th className="py-2">Created By</th>
              <th className="py-2">Class</th>
              <th className="py-2">Date</th>
              <th className="py-2">Time</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id} className="text-center">
                <td className="border px-4 py-2">{exam.EXAM_NAME}</td>
                <td className="border px-4 py-2">{exam.SUBJECT}</td>
                <td className="border px-4 py-2">{exam.CREATED_BY}</td>
                <td className="border px-4 py-2">{exam.CLASS}</td>
                <td className="border px-4 py-2">{exam.DATE}</td>
                <td className="border px-4 py-2">{exam.TIME}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => toggleStatus(exam.id)}
                    className={`px-2 py-1 rounded ${
                      exam.STATUS ? 'bg-green-500' : 'bg-red-500'
                    } text-white`}
                  >
                    {exam.STATUS ? 'ON' : 'OFF'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OnlineExam;
