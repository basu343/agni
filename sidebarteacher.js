// src/components/SidebarTeacher.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const SidebarTeacher = () => {
    const navigate =useNavigate();

  const navigate1= useNavigate();
  const navigate2= useNavigate();
  const navigate3= useNavigate();
  const navigate4= useNavigate();
  const navigate5= useNavigate();
  const navigate6= useNavigate();
  const handleLogoutClick = () => {
    navigate('/');
  };
 const handleclickDash = () => {
    navigate1('/teacherdash');
  };
  const handleonlineexamClick = () => {
    navigate2('/onlineexamT');
  };
  const handlemanagestudent = () => {
    navigate3('/managestudentT');
  };
  const handlecoursecontent = () => {
    navigate4('/coursematerial');
  };
  const handlequestions = () => {
    navigate5('/questionpageT');
  };
  const handlesubmittedexam= () => {
    navigate6('/submittedexam');
  };


  return (
    <div className="w-64 bg-black text-white p-4 flex flex-col gap-4 h-full">
      <div className="flex items-center gap-2 mb-6">
        <div className="text-2xl font-bold">Agni Parikshya</div>
        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
          <span className="text-xs font-bold text-white">A+</span>
        </div>
      </div>
      <div className="flex items-center gap-2 py-2 hover:bg-gray-800 rounded-md cursor-pointer">
        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h16" />
          </svg>
        </div>
        <span onClick={handleclickDash}>Dashboard</span>
      </div>
      <div className="flex items-center gap-2 py-2 hover:bg-gray-800 rounded-md cursor-pointer">
        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7.5" r="4.5" />
            <path d="M12 14l9-9" />
          </svg>
        </div>
        <span onClick={handlemanagestudent}>Manage Students</span>
      </div>
      <div className="flex items-center gap-2 py-2 hover:bg-gray-800 rounded-md cursor-pointer">
        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7.5" r="4.5" />
            <path d="M12 14l9-9" />
          </svg>
        </div>
        <span onClick={handleonlineexamClick}>Online Exam</span>
      </div>
      <div className="flex items-center gap-2 py-2 hover:bg-gray-800 rounded-md cursor-pointer">
        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <path d="M12 14l9-9" />
            <path d="M9 9h6" />
            <path d="M9 15h6" />
          </svg>
        </div>
        <span onClick={handlecoursecontent}>Course Materials</span>
      </div>
      <div className="flex items-center gap-2 py-2 hover:bg-gray-800 rounded-md cursor-pointer">
        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 12h.01" />
            <path d="M12 14l9-9m-9 9h.01" />
            <path d="M16 12h.01" />
          </svg>
        </div>
        <span onClick={handlequestions}>Questions</span>
      </div>
      <div className="flex items-center gap-2 py-2 hover:bg-gray-800 rounded-md cursor-pointer">
        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 12h.01" />
            <path d="M12 14l9-9m-9 9h.01" />
            <path d="M16 12h.01" />
          </svg>
        </div>
        <span onClick={handlesubmittedexam}>Submitted Exams</span>
      </div>
      <div className="flex items-center gap-2 py-2 hover:bg-gray-800 rounded-md cursor-pointer">
        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 12h.01" />
            <path d="M12 14l9-9m-9 9h.01" />
            <path d="M16 12h.01" />
          </svg>
        </div>
        <span onClick={handleLogoutClick}>Logout</span>
      </div>
    </div>
  );
};

export default SidebarTeacher;
