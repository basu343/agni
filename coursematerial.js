import React, { useEffect, useState } from 'react';
import { supabase } from '../createClient'; // Adjust path as needed
import SidebarTeacher from '../sidebarteacher';
import { useNavigate } from 'react-router-dom';

const CourseMaterial = () => {
  const [courseMaterials, setCourseMaterials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseMaterials = async () => {
      const { data, error } = await supabase
        .from('course')
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setCourseMaterials(data);
      }
    };

    fetchCourseMaterials();
  }, []);

  const handleUpload = () => {
    navigate('/uploadCourseMaterial');
  };

  const handleView = (content) => {
    const url = `https://agni.supabase.co/storage/v1/object/public/course-materials/${encodeURIComponent(content)}`;
    window.open(url, '_blank');
  };
  

  return (
    <div className="flex h-screen">
      <SidebarTeacher />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Course Materials</h1>
        <button
          onClick={handleUpload}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Upload Course Material
        </button>
        <div className="overflow-auto">
          <table className="w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Lecturer</th>
                <th className="py-2 px-4 border">Subject</th>
                <th className="py-2 px-4 border">Topic</th>
                <th className="py-2 px-4 border">Class</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Content</th>
              </tr>
            </thead>
            <tbody>
              {courseMaterials.map((material, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border">{material.lecturer}</td>
                  <td className="py-2 px-4 border">{material.subject}</td>
                  <td className="py-2 px-4 border">{material.topic}</td>
                  <td className="py-2 px-4 border">{material.class}</td>
                  <td className="py-2 px-4 border">{material.date}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleView(material.content)}
                      className="px-2 py-1 text-xs md:text-sm bg-green-500 text-white rounded hover:bg-green-700"
                    >
                      View
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

export default CourseMaterial;
