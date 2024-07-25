import React, { useEffect, useState } from 'react';
import SidebarStudent from '../sidebarStudent';
import { supabase } from '../createClient';

const Studentdash = () => {
  const [teacherCount, setTeacherCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [examCount, setExamCount] = useState(0);
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Get the logged-in student's ID from localStorage
        const userId = localStorage.getItem('userId');
        if (!userId) throw new Error('No user ID found');

        // Fetch student details
        const { data: studentData, error: studentError } = await supabase
          .from('student')
          .select('*')
          .eq('ID', userId)
          .single();

        if (studentError) throw studentError;
        setStudentInfo(studentData);

        // Fetch counts
        const [
          { count: teachersCount, error: teachersError },
          { count: studentsCount, error: studentsError },
          { count: objectiveQuestionsCount, error: objectiveQuestionsError },
          { count: subjectiveQuestionsCount, error: subjectiveQuestionsError },
          { count: examCount, error: examCountError },
        ] = await Promise.all([
          supabase.from('teacher').select('*', { count: 'exact', head: true }),
          supabase.from('student').select('*', { count: 'exact', head: true }),
          supabase.from('objectivequestions').select('*', { count: 'exact', head: true }),
          supabase.from('subjectivequestions').select('*', { count: 'exact', head: true }),
          supabase.from('exam').select('*', { count: 'exact', head: true }),
        ]);

        if (teachersError || studentsError || objectiveQuestionsError || subjectiveQuestionsError||examCountError) {
          throw new Error('Error fetching counts');
        }

        const totalQuestionsCount = (objectiveQuestionsCount ?? 0) + (subjectiveQuestionsCount ?? 0);

        setTeacherCount(teachersCount);
        setStudentCount(studentsCount);
        setQuestionCount(totalQuestionsCount);
        setExamCount(examCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen">
      <SidebarStudent className="w-64 bg-gray-800 text-white" />

      <div className="flex-1 bg-gray-100 p-6 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 bg-white shadow-md rounded-lg p-4">
          <div className="relative flex-1">
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:ring-blue-300 placeholder-gray-500"
              placeholder="Search..."
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-5 h-5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="15" y2="15" />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                3
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition">
                <img
                  src="./notify.jpg"
                  className="rounded-full h-8 w-8 border-2 border-gray-300 cursor-pointer hover:border-blue-400 transition"
                  alt="notification"
                />
              </div>
            </div>
            <div className="relative">
              <img
                src="./profile.jpg"
                className="rounded-full h-10 w-10 border-2 border-gray-300 cursor-pointer hover:border-blue-400 transition"
                alt="profile"
              />
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center transition-transform transform hover:scale-105">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-blue-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7.5" r="4.5" />
                <path d="M12 14l9-9" />
              </svg>
            </div>
            <span className="text-xl font-bold mt-4">Teachers</span>
            <span className="text-lg">{teacherCount}</span>
          </div>
          <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 text-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center transition-transform transform hover:scale-105">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7.5" r="4.5" />
                <path d="M12 14l9-9" />
              </svg>
            </div>
            <span className="text-xl font-bold mt-4">Students</span>
            <span className="text-lg">{studentCount}</span>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 text-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center justify-center transition-transform transform hover:scale-105">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-yellow-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <path d="M12 14l9-9" />
                <path d="M9 9h6" />
                <path d="M9 15h6" />
              </svg>
            </div>
            <span className="text-xl font-bold mt-4">Questions</span>
            <span className="text-lg">{questionCount}</span>
          </div>
          <div className="bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center transition-transform transform hover:scale-105">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <path d="M12 14l9-9" />
                <path d="M9 9h6" />
                <path d="M9 15h6" />
              </svg>
            </div>
            <span className="text-xl font-bold mt-4">Exams</span>
            <span className="text-lg">{examCount}</span>
          </div>
        </div>

        {/* Student Information */}
        {studentInfo && (
  <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 shadow-lg rounded-lg p-6 border-t-4 border-teal-400 max-w-6xl mx-auto max-h-[400px] overflow-y-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-teal-400 hover:border-teal-600 transition-all duration-300 transform hover:scale-105">
        <h3 className="text-xl font-semibold text-teal-700 mb-4">Personal Details</h3>
        <p className="text-gray-800 mb-2 text-sm"><strong>ID:</strong> <span className="text-teal-500">{studentInfo.ID}</span></p>
        <p className="text-gray-800 mb-2 text-sm"><strong>Name:</strong> <span className="text-teal-500">{studentInfo.STUDENTNAME}</span></p>
        <p className="text-gray-800 mb-2 text-sm"><strong>Email:</strong> <span className="text-teal-500">{studentInfo.EMAIL}</span></p>
        <p className="text-gray-800 mb-2 text-sm"><strong>Department:</strong> <span className="text-teal-500">{studentInfo.DEPARTMENT}</span></p>
        <p className="text-gray-800 mb-2 text-sm"><strong>Gender:</strong> <span className="text-teal-500">{studentInfo.GENDER}</span></p>
        <p className="text-gray-800 mb-2 text-sm"><strong>Subject:</strong> <span className="text-teal-500">{studentInfo.SUBJECT}</span></p>
        <p className="text-gray-800 text-sm"><strong>Class:</strong> <span className="text-teal-500">{studentInfo.CLASS}</span></p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-indigo-400 hover:border-indigo-600 transition-all duration-300 transform hover:scale-105">
        <h3 className="text-xl font-semibold text-indigo-700 mb-4">Rules and Regulations</h3>
        <ul className="list-disc list-inside text-gray-800 text-sm space-y-2">
          <li className="hover:text-indigo-600 transition-colors">Tab Switching Limit: Allow up to two tab switches; auto-submit the exam on the third switch.</li>
          <li className="hover:text-indigo-600 transition-colors">Disable Copy-Paste: Prevent pasting in the answer text area.</li>
          <li className="hover:text-indigo-600 transition-colors">Question Timer: Implement a timer per question; disable input when time’s up.</li>
          <li className="hover:text-indigo-600 transition-colors">Warning on Tab Switch: Warn users when switching tabs; track the number of switches.</li>
          <li className="hover:text-indigo-600 transition-colors">Navigation and Answering Restrictions: Disable navigation and answering after the timer expires.</li>
        </ul>
      </div>
    </div>
  </div>
)}


      </div>
    </div>
  );
};

export default Studentdash;
