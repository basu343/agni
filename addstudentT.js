import React, { useState } from 'react';

import Sidebar from '../sidebar';
import { supabase } from '../createClient';

const AddStudentT = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    department: '',
    email: '',
    address: '',
    class: '',
    subject:'',
    gender: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToInsert = {
     STUDENTNAME: formData.name,
      USERNAME: formData.username,
      PASSWORD: formData.password,
      DEPARTMENT: formData.department,
      EMAIL: formData.email,
      ADDRESS: formData.address,
      CLASS: formData.class,
      SUBJECT:formData.subject,
      GENDER: formData.gender,
    };

    const { data, error } = await supabase
      .from('student')
      .insert([dataToInsert]);

    if (error) {
      console.error('Error inserting data:', error);
      setMessage('Error saving data');
    } else {
      console.log('Data saved successfully:', data);
      setMessage('Student data saved successfully!');
      setFormData({
        name: '',
        username: '',
        password: '',
        department: '',
        email: '',
        address: '',
        class: '',
        subject:'',
        gender: '',
      });
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Student Form</h2>
        {message && <div className="mb-4 text-center text-green-500">{message}</div>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Name', type: 'text', name: 'name' },
            { label: 'Username', type: 'text', name: 'username' },
            { label: 'Password', type: 'password', name: 'password' },
            { label: 'Department', type: 'text', name: 'department' },
            { label: 'Email', type: 'email', name: 'email' },
            { label: 'Address', type: 'text', name: 'address' },
            { label: 'Class', type: 'text', name: 'class' },
            { label: 'SUBJECT', type: 'text', name: 'subject' },
          ].map(({ label, type, name }) => (
            <div key={name} className="flex flex-col">
              <label htmlFor={name} className="mb-2 font-medium">{label}</label>
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ))}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="gender" className="mb-2 font-medium">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentT;
