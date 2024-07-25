import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { supabase } from '../createClient';
import SidebarTeacher from '../sidebarteacher';


const ManageStudentT = () => {
  const navigate = useNavigate();
  const [students, setStudent] = useState([]);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchStudent = async () => {
      const { data, error } = await supabase
        .from('student')
        .select('*');

      if (error) {
        console.error('Error fetching student:', error);
      } else {
        setStudent(data);
      }
    };

    fetchStudent();
  }, []);

  const addStudentHandle = (e) => {
    e.preventDefault();
    navigate('/addstudentT');
  };

  const handleEdit = (id) => {
    console.log(`Edit student with ID ${id}`);
    navigate(`/editstudentT/${id}`);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('student')
      .delete()
      .eq('ID', id);

    if (error) {
      console.error('Error deleting student:', error);
    } else {
      setStudent(students.filter(student => student.ID !== id));
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarTeacher className="w-64" /> 
      <div className="flex-1 p-4 overflow-auto bg-gray-100 "> 
        <h1 className="text-2xl font-bold mb-4">Manage Student</h1>
        <div className="mb-4">
          <a 
            onClick={addStudentHandle}
            href="#"
            className="text-gray-600 hover:text-gray-800 font-bold"
          >
            + Add Student
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md border-gray-200 rounded-lg">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STUDENTRNAME</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">USERNAME</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PASSWORD</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DEPARTMENT</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EMAIL</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ADDRESS</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SUBJECT</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CLASS</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GENDER</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.ID}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{student.ID}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{student.STUDENTNAME}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{student.USERNAME}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{student.PASSWORD}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{student.DEPARTMENT}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{student.EMAIL}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{student.ADDRESS}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{student.SUBJECT}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{student.CLASS}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{student.GENDER}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 space-x-2">
                    <button
                      onClick={() => handleEdit(student.ID)} 
                      className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student.ID)} 
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-700"
                    >
                      Delete
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

export default ManageStudentT;
