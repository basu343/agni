// src/pages/ExamPage.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../createClient';
import SidebarStudent from '../../sidebarStudent';

const ExamPage = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);

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
          const updatedStatus = examDateTime <= now ? 'Take Exam' : 'Upcoming';
          return { ...exam, STATUS: updatedStatus };
        });

        setExams(updatedExams);
        // Perform initial status update
        await updateExamStatuses(updatedExams);
      }
    };

    fetchExams();

    const intervalId = setInterval(async () => {
      const { data, error } = await supabase
        .from('exam')
        .select('*');
      if (!error) {
        const now = new Date();
        const updatedExams = data.map((exam) => {
          const examDateTime = new Date(`${exam.DATE}T${exam.TIME}`);
          const updatedStatus = examDateTime <= now ? 'Take Exam' : 'Upcoming';
          return { ...exam, STATUS: updatedStatus };
        });

        setExams(updatedExams);
        await updateExamStatuses(updatedExams);
      }
    }, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, []);

  const updateExamStatuses = async (exams) => {
    const now = new Date();
    const updates = exams
      .map(async (exam) => {
        const examDateTime = new Date(`${exam.DATE}T${exam.TIME}`);
        const updatedStatus = examDateTime <= now ? 'Take Exam' : 'Upcoming';

        if (exam.STATUS !== updatedStatus) {
          const { error } = await supabase
            .from('exam')
            .update({ STATUS: updatedStatus })
            .eq('ID', exam.ID);

          if (error) {
            console.error('Error updating exam status:', error.message);
          }
        }
      });

    await Promise.all(updates);
  };

  const handleTakeExam = (exam) => {
    navigate('/takeexampage', {
      state: {
        examId: exam.ID,
        examName: exam.EXAM_NAME,
        subject: exam.SUBJECT,
        class: exam.CLASS,
        examDate: exam.DATE,
        examType: exam.TYPE // Ensure this field is in your table
      }
    });
  };

  return (
    <div className="flex h-screen">
      <SidebarStudent />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Online Exam Page</h1>
        
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
              <tr key={exam.ID} className="text-center">
                <td className="border px-4 py-2">{exam.EXAM_NAME}</td>
                <td className="border px-4 py-2">{exam.SUBJECT}</td>
                <td className="border px-4 py-2">{exam.CREATED_BY}</td>
                <td className="border px-4 py-2">{exam.CLASS}</td>
                <td className="border px-4 py-2">{exam.DATE}</td>
                <td className="border px-4 py-2">{exam.TIME}</td>
                <td className="border px-4 py-2">
                  {exam.STATUS === 'Take Exam' ? (
                    <button
                      onClick={() => handleTakeExam(exam)}
                      className="px-2 py-1 rounded bg-green-500 text-white"
                    >
                      Take Exam
                    </button>
                  ) : (
                    <span className="px-2 py-1 rounded bg-red-500 text-white">
                      {exam.STATUS}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamPage;
