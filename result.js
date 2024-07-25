// src/pages/ResultPage.js

import React, { useState, useEffect } from 'react';
import SidebarStudent from '../../sidebarStudent';
import { supabase } from '../../createClient'; // Ensure correct import path

const ResultPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data, error } = await supabase
          .from('result')
          .select('*');

        if (error) {
          console.error('Error fetching results:', error.message);
        } else {
          setResults(data);
        }
      } catch (error) {
        console.error('Unexpected error fetching results:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen">
        <SidebarStudent />
        <div className="flex-1 p-4 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Results</h1>
          <p>Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <SidebarStudent />
      <div className="flex-1 p-4 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Results</h1>
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Name</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Date</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Type</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Marks</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Obtained Marks</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.map((result, index) => (
              <tr key={index}>
                <td className="py-4 px-6 whitespace-nowrap">{result.EXAM_NAME}</td>
                <td className="py-4 px-6 whitespace-nowrap">{result.EXAM_DATE}</td>
                <td className="py-4 px-6 whitespace-nowrap">{result.CLASS}</td>
                <td className="py-4 px-6 whitespace-nowrap">{result.SUBJECT}</td>
                <td className="py-4 px-6 whitespace-nowrap">{result.EXAM_TYPE}</td>
                <td className="py-4 px-6 whitespace-nowrap">{result.TOTAL_MARKS}</td>
                <td className="py-4 px-6 whitespace-nowrap">{result.OBTAIN_MARKS}</td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      result.RESULT === 'Passed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {result.RESULT}
                  </span>
                </td>
                <td className="py-4 px-6 whitespace-nowrap">{result.FEEDBACK}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultPage;
