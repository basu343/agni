// src/components/Sidebar.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate1 = useNavigate();
  const navigate2 = useNavigate();
  const navigate3 = useNavigate();
  const navigate4 = useNavigate();
  const navigate5 = useNavigate();
  const navigate6 = useNavigate();

  const handleLogoutClick = () => {
    navigate1('/'); 
  };
  const handleManageTeachersClick = () => {
    navigate2('/manageteacher');
  };
  const handleManageStudentsClick = () => {
    navigate3('/managestudent');
  };
  const handleOnlineExamClick = () => {
    navigate4('/onlineexam');
  };
  const handledashboardClick = () => {
    navigate5('/admindash');
  };
  const handlequestionClick = () => {
    navigate6('/questions');
  };

  return (
    <div className="w-64 bg-black text-white p-4 flex flex-col gap-4">
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
        <span onClick={handledashboardClick}>Dashboard</span>
      </div>
      <div className="flex items-center gap-2 py-2 hover:bg-gray-800 rounded-md cursor-pointer">
        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7.5" r="4.5" />
            <path d="M12 14l9-9" />
          </svg>
        </div>
        <span onClick={handleManageTeachersClick}>Manage Teachers</span>
      </div>
      <div className="flex items-center gap-2 py-2 hover:bg-gray-800 rounded-md cursor-pointer">
        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7.5" r="4.5" />
            <path d="M12 14l9-9" />
          </svg>
        </div>
        <span onClick={handleManageStudentsClick}>Manage Students</span>
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
        <span onClick={handleOnlineExamClick}>Online Exams</span>
      </div>
      <div className="flex items-center gap-2 py-2 hover:bg-gray-800 rounded-md cursor-pointer">
        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 12h.01" />
            <path d="M12 14l9-9m-9 9h.01" />
            <path d="M16 12h.01" />
          </svg>
        </div>
        <span onClick={handlequestionClick}>Questions</span>
      </div>
      <div className="flex items-center gap-2 py-2 hover:bg-gray-800 rounded-md cursor-pointer">
        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h16" />
          </svg>
        </div>
        <span onClick={handleLogoutClick}>Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
