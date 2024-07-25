import React, { useEffect, useState } from 'react';
import { supabase } from '../../createClient';
import SidebarStudent from '../../sidebarStudent';

const CourseMaterial = () => {
  const [courseMaterials, setCourseMaterials] = useState([]);
  
  useEffect(() => {
    const fetchCourseMaterials = async () => {
      const { data, error } = await supabase
        .from('course')
        .select('*');
      
      if (error) {
        console.error('Error fetching data:', error.message);
      } else {
        setCourseMaterials(data);
      }
    };

    fetchCourseMaterials();
  }, []);

  const handleView = async (filePath) => {
    try {
      // Construct the file URL
      const fileUrl = `https://ztdnccmanmxylevmwoxa.supabase.co/storage/v1/object/public/course-materials/${filePath}`;

      // Fetch the file to check if it exists
      const response = await fetch(fileUrl);

      if (response.ok) {
        const contentType = response.headers.get('Content-Type');
        if (contentType.startsWith('image/') || contentType.startsWith('video/')) {
          // For images and videos, open in a new tab
          window.open(fileUrl, '_blank');
        } else if (contentType.startsWith('application/pdf')) {
          // For PDFs, open in a new tab
          window.open(fileUrl, '_blank');
        } else {
          // For other file types, provide download link
          alert('File type not supported for direct viewing. Downloading...');
          window.open(fileUrl, '_blank');
        }
      } else {
        console.error('File not found or there was an issue accessing the file:', response.statusText);
        alert('File not found or there was an issue accessing the file.');
      }
    } catch (error) {
      console.error('An error occurred while fetching the file:', error);
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <div className="flex h-screen">
      <SidebarStudent />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Course Materials</h1>
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
