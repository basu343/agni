import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar';
import { supabase } from '../createClient';
import { useNavigate } from 'react-router-dom';

const AdminDash = () => {
  const [teacherCount, setTeacherCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [examCount, setExamCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleQuestion = (e) => {
    e.preventDefault();
    navigate('/questions');
  };
  
  const [adminInfo, setAdminInfo] = useState({
    name: 'Admin',
    role: 'Administrator',
    email: 'admin@gmail.com',
    recentActivities: [
      { title: 'Updated User Permissions', date: '2024-07-10' },
      { title: 'Reviewed System Logs', date: '2024-07-08' },
      // Removed: { title: 'Conducted Staff Meeting', date: '2024-07-05' }
    ],
  });

  useEffect(() => {

    const fetchCounts = async () => {
      try {
        setLoading(true);

        // Perform all queries simultaneously
        const [
          { count: teachersCount, error: teachersError },
          { count: studentsCount, error: studentsError },
          { count: objectiveQuestionsCount, error: objectiveQuestionsError },
          { count: subjectiveQuestionsCount, error: subjectiveQuestionsError },
          { count: examCount, error: examCountError },
        ] = await Promise.all([
          supabase.from("teacher").select("*", { count: "exact", head: true }),
          supabase.from("student").select("*", { count: "exact", head: true }),
          supabase
            .from("objectivequestions")
            .select("*", { count: "exact", head: true }),
          supabase
            .from("subjectivequestions")
            .select("*", { count: "exact", head: true }),
            supabase.from("exam").select("*", { count: "exact", head: true }),
        ]);

        // Handle potential errors
        if (teachersError) throw teachersError;
        if (studentsError) throw studentsError;
        if (objectiveQuestionsError) throw objectiveQuestionsError;
        if (subjectiveQuestionsError) throw subjectiveQuestionsError;
        if (examCountError) throw examCountError;

        // Combine counts of objective and subjective questions
        const totalQuestionsCount =
          (objectiveQuestionsCount ?? 0) + (subjectiveQuestionsCount ?? 0);

        // Set counts
        setTeacherCount(teachersCount);
        setStudentCount(studentsCount);
        setQuestionCount(totalQuestionsCount);
        setExamCount(examCount);
         // This is the combined count of objective and subjective questions
      } catch (error) {
        console.error("Error fetching counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4 bg-gray-50 p-4 rounded-lg shadow-md">
          <div className="w-full">
            <div className="relative">
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
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                3
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition">
                <img
                  src="./notify.jpg"
                  className="rounded-full h-10 w-10 border-2 border-gray-300 cursor-pointer hover:border-blue-400 transition"
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
        <div className="grid grid-cols-4 gap-4 mb-6">
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
            <span className="text-xl font-bold mt-4" onClick={handleQuestion}>Questions</span>
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

        {/* Welcome Admin Section */}
        <div className="bg-gradient-to-r from-teal-400 to-blue-600 p-8 rounded-lg shadow-lg mb-6 text-white">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-extrabold mb-2">Welcome, {adminInfo.name}!</h2>
            <p className="text-xl">As the {adminInfo.role}, you play a crucial role in our system. Here’s a summary of your recent activities:</p>
          </div>
          <div className="bg-white text-gray-800 rounded-md shadow-md p-6">
            <h3 className="text-2xl font-semibold mb-4">Recent Activities</h3>
            <ul className="list-disc pl-5">
              {adminInfo.recentActivities.map((activity, index) => (
                <li key={index} className="mb-3">
                  <strong>{activity.title}:</strong> {activity.date}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
