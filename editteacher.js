import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../createClient';
import Sidebar from '../../sidebar';

const EditTeacher = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState({
    ID: '',
    STUDENTNAME: '',
    USERNAME: '',
    PASSWORD: '',
    DEPARTMENT: '',
    EMAIL: '',
    ADDRESS: '',
    PHONE: '',
    SUBJECT: '',
    GENDER: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacher = async () => {
      const { data, error } = await supabase
        .from('teacher')
        .select('*')
        .eq('ID', id)
        .single();

      if (error) {
        console.error('Error fetching teacher:', error);
      } else {
        setTeacher(data);
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher(prevTeacher => ({
      ...prevTeacher,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('teacher')
      .update(teacher)
      .eq('ID', id);

    if (error) {
      console.error('Error updating teacher:', error);
    } else {
      navigate('/manageteacher'); // Redirect after update
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-4 bg-gray-100 ml-64">
        <h1 className="text-2xl font-bold mb-4">Edit Teacher</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Teacher Name</label>
              <input
                type="text"
                name="TEACHERNAME"
                value={teacher.TEACHERNAME}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="USERNAME"
                value={teacher.USERNAME}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="PASSWORD"
                value={teacher.PASSWORD}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <input
                type="text"
                name="DEPARTMENT"
                value={teacher.DEPARTMENT}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="EMAIL"
                value={teacher.EMAIL}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="ADDRESS"
                value={teacher.ADDRESS}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="int"
                name="PHONE"
                value={teacher.PHONE}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                name="SUBJECT"
                value={teacher.SUBJECT}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <input
                type="text"
                name="GENDER"
                value={teacher.GENDER}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTeacher;
