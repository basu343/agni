import React, { useState, useEffect } from 'react';
import SidebarTeacher from '../../sidebarteacher';
import { supabase } from '../../createClient'; // Adjust the import path as necessary

const CreateSubjectiveQuestion = () => {
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [lecturer, setLecturer] = useState('');
  const [questions, setQuestions] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      question: '',
      marks: '',
    }))
  );

  useEffect(() => {
    const fetchLecturerName = async () => {
      const storedTeacherID = localStorage.getItem('userId');
      if (storedTeacherID) {
        const { data, error } = await supabase
          .from('teacher')
          .select('TEACHERNAME')
          .eq('ID', storedTeacherID)
          .single();

        if (error) {
          console.error('Error fetching lecturer name:', error.message);
        } else {
          setLecturer(data?.TEACHERNAME || '');
        }
      }
    };

    fetchLecturerName();
  }, []);

  const handleQuestionChange = (index, field, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === index ? { ...q, [field]: value } : q
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuestions = questions.map((q) => ({
      CLASS: className,
      SUBJECT: subject,
      CREATEDDATE: createdDate,
      LECTURER: lecturer,
      QUESTIONS: q.question,
      MARKS: q.marks,
    }));

    // Save the data to Supabase
    const { data, error } = await supabase
      .from('subjectivequestions') // Replace with your table name
      .insert(newQuestions);

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Data inserted successfully:', data);
      // Optionally, you can redirect or clear the form here
      // navigate('/somepath'); // Redirect to another page
      // clearForm(); // Clear the form fields if needed
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarTeacher />
      <div className="flex-1 ml-30 h-screen overflow-y-auto p-6"> {/* Adjusted margin-left to decrease distance */}
        <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Create Subjective Questions</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-2 mb-4">
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label htmlFor="className" className="block text-gray-700 font-bold mb-1">Class:</label>
                <input
                  id="className"
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-2">
                <label htmlFor="subject" className="block text-gray-700 font-bold mb-1">Subject:</label>
                <input
                  id="subject"
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-2 mb-4">
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label htmlFor="createdDate" className="block text-gray-700 font-bold mb-1">Created Date:</label>
                <input
                  id="createdDate"
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  value={createdDate}
                  onChange={(e) => setCreatedDate(e.target.value)}
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-2">
                <label htmlFor="lecturer" className="block text-gray-700 font-bold mb-1">Lecturer:</label>
                <input
                  id="lecturer"
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  value={lecturer}
                  readOnly
                />
              </div>
            </div>
            {questions.map((q, index) => (
              <div key={index} className="mb-4">
                {index >= 1 && (
                  <>
                    <label htmlFor={`question-${index}`} className="block text-gray-700 font-bold mb-1">Question {index + 1}:</label>
                    <textarea
                      id={`question-${index}`}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      value={q.question}
                      onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                      required
                    />
                    <label htmlFor={`marks-${index}`} className="block text-gray-700 font-bold mb-1">Marks:</label>
                    <input
                      id={`marks-${index}`}
                      type="number"
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      value={q.marks}
                      onChange={(e) => handleQuestionChange(index, 'marks', e.target.value)}
                      required
                    />
                  </>
                )}
              </div>
            ))}
            <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 text-sm">Create Questions</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSubjectiveQuestion;
