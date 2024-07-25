import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../createClient';

const ManageTeacher = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchTeachers = async () => {
      const { data, error } = await supabase
        .from('teacher')
        .select('*');

      if (error) {
        console.error('Error fetching students:', error);
      } else {
        setTeachers(data);
      }
    };

    fetchTeachers();
  }, []);

  const addTeacherHandle = (e) => {
    e.preventDefault();
    navigate('/addteacher');
  };

  const handleEdit = (id) => {
    console.log(`Edit teacher with ID ${id}`);
    navigate(`/editteacher/${id}`);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('teacher')
      .delete()
      .eq('ID', id); // Use uppercase 'ID'

    if (error) {
      console.error('Error deleting teacher:', error);
    } else {
      setTeachers(teachers.filter(teacher => teacher.ID !== id)); // Use uppercase 'ID'
    }
  };

  return (
    <div className="flex h-screen ">
      <Sidebar className="w-64"/>
      <div className="flex-1 p-4 overflow-auto bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Manage Teacher</h1>
        <div className="mb-4">
          <a 
            onClick={addTeacherHandle}
            href="#"
            className="text-gray-600 hover:text-gray-800 font-bold"
          >
            + Add Teacher
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md border-gray-200 rounded-lg">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TEACHERNAME</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">USERNAME</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PASSWORD</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DEPARTMENT</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EMAIL</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ADDRESS</th>
                
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SUBJECT</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GENDER</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {teachers.map((teacher) => (
                <tr key={teacher.ID}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.ID}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.TEACHERNAME}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.USERNAME}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.PASSWORD}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.DEPARTMENT}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.EMAIL}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.ADDRESS}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.PHONE}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.SUBJECT}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.GENDER}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 space-x-2">
                    <button
                      onClick={() => handleEdit(teacher.ID)} 
                      className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(teacher.ID)} 
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

export default ManageTeacher;
