import React, { useState, useEffect } from 'react';
import { supabase } from '../../createClient';
import SidebarTeacher from '../../sidebarteacher';

const UploadCourseMaterial = () => {
  const [lecturer, setLecturer] = useState('');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [classValue, setClassValue] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchTeacherName = async () => {
      const storedTeacherID = localStorage.getItem('userId');
      if (storedTeacherID) {
        const { data, error } = await supabase
          .from('teacher')
          .select('TEACHERNAME')
          .eq('ID', storedTeacherID)
          .single();

        if (error) {
          console.error('Error fetching teacher name:', error.message);
        } else {
          setLecturer(data?.TEACHERNAME || '');
        }
      }
    };

    fetchTeacherName();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please upload a file.');
      return;
    }

    const fileName = `${Date.now()}_${file.name}`; // Prefix file name with timestamp to avoid conflicts
    const { data, error: uploadError } = await supabase.storage
      .from('course-materials')
      .upload(`public/${fileName}`, file);

    if (uploadError) {
      alert('Error uploading file: ' + uploadError.message);
      return;
    }

    // Construct the file URL
    const fileUrl = `${supabase.storageUrl}/course-materials/public/${fileName}`;

    const { error: insertError } = await supabase
      .from('course')
      .insert({
        lecturer,
        subject,
        topic,
        class: classValue,
        date,
        content: fileUrl
      });

    if (insertError) {
      alert('Error inserting data: ' + insertError.message);
    } else {
      alert('Course material uploaded successfully!');
      setSubject('');
      setTopic('');
      setClassValue('');
      setDate('');
      setFile(null);
    }
  };

  return (
    <div className="flex h-screen bg-gray-200">
      <SidebarTeacher />
      <main className="flex-1 p-6 lg:p-12 bg-white rounded-lg shadow-lg mx-4 lg:mx-8 my-4 lg:my-8 max-w-5xl">
        <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">Upload Course Material</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-900">Lecturer</label>
            <input
              type="text"
              value={lecturer}
              readOnly
              className="mt-1 p-3 border border-blue-300 rounded-md shadow-sm text-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-900">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="mt-1 p-3 border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-900">Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              className="mt-1 p-3 border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-900">Class</label>
            <input
              type="text"
              value={classValue}
              onChange={(e) => setClassValue(e.target.value)}
              required
              className="mt-1 p-3 border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-900">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="mt-1 p-3 border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>

          <div className="flex flex-col col-span-1 md:col-span-2">
            <label className="text-sm font-medium text-gray-900">Content (File)</label>
            <input
              type="file"
              onChange={handleFileChange}
              required
              className="mt-1 p-3 text-gray-500 border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="col-span-1 md:col-span-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default UploadCourseMaterial;
