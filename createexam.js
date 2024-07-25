// src/pages/CreateExamPage.js

import React, { useState, useEffect } from 'react';
import SidebarTeacher from '../../sidebarteacher';
import { supabase } from '../../createClient'; // Adjust the import path as necessary

const CreateExamPage = () => {
  const [formData, setFormData] = useState({
    examName: '',
    subject: '',
    createdBy: '',
    class: '',
    date: '',
    time: '',
  });
  const [teacherId, setTeacherId] = useState(null); // Assuming you have a way to get the teacher's ID

  useEffect(() => {
    // Fetch teacher ID from local storage or authentication context
    const fetchTeacherId = async () => {
      const id = localStorage.getItem('userId'); // Replace this with your method to get the ID
      setTeacherId(id);
    };

    fetchTeacherId();
  }, []);

  useEffect(() => {
    if (teacherId) {
      const fetchTeacherName = async () => {
        const { data, error } = await supabase
          .from('teacher')
          .select('TEACHERNAME')
          .eq('ID', teacherId)
          .single();

        if (error) {
          console.error('Error fetching teacher name:', error);
        } else {
          setFormData((prev) => ({
            ...prev,
            createdBy: data.TEACHERNAME || '', // Ensure this matches the actual column name in your table
          }));
        }
      };

      fetchTeacherName();
    }
  }, [teacherId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { data, error } = await supabase
      .from('exam')
      .insert([
        {
          EXAM_NAME: formData.examName,
          SUBJECT: formData.subject,
          CREATED_BY: formData.createdBy,
          CLASS: formData.class,
          DATE: formData.date,
          TIME: formData.time,
        },
      ]);
  
    if (error) {
      console.error('Error inserting exam data:', error.message);
      alert('Error creating exam: ' + error.message);
    } else {
      alert('Exam Created Successfully!');
      // Reset form
      setFormData({
        examName: '',
        subject: '',
        createdBy: formData.createdBy, // Keep the teacher's name
        class: '',
        date: '',
        time: '',
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarTeacher />
      <div className="flex-1 p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
        <h1 className="text-xl font-bold mb-4 text-blue-600">Create New Exam</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Exam Name</label>
              <input
                type="text"
                name="examName"
                value={formData.examName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Created By</label>
              <input
                type="text"
                name="createdBy"
                value={formData.createdBy}
                className="w-full p-2 border border-gray-300 rounded bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                readOnly // Make the field read-only if you don't want it to be editable
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Class</label>
              <input
                type="text"
                name="class"
                value={formData.class}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateExamPage;
