import React, { useState, useEffect } from 'react';
import { supabase } from '../../createClient';
import SidebarTeacher from '../../sidebarteacher';

const CreateMCQQuestion = () => {
  const [questions, setQuestions] = useState(Array(10).fill({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    className: '',
    subject: '',
    createdDate: '',
    lecturer: ''
  }));
  const [currentIndex, setCurrentIndex] = useState(0);

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
          setQuestions(prevQuestions => prevQuestions.map(q => ({ ...q, lecturer: data?.TEACHERNAME || '' })));
        }
      }
    };

    fetchLecturerName();
  }, []);

  const handleOptionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex].options[index] = value;
    setQuestions(updatedQuestions);
  };

  const handleFieldChange = (field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data
    const currentQuestions = questions.slice(currentIndex, currentIndex + 10);
    
    // Insert data into Supabase
    const { data, error } = await supabase
      .from('objectivequestions')
      .insert(currentQuestions.map(question => ({
        QUESTIONS: question.question,
        OPTION_1: question.options[0],
        OPTION_2: question.options[1],
        OPTION_3: question.options[2],
        OPTION_4: question.options[3],
        CORRECT_ANSWER: question.correctAnswer,
        CLASS: question.className,
        SUBJECT: question.subject,
        CREATED_DATE: question.createdDate,
        LECTURER: question.lecturer
      })));

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Data inserted successfully:', data);
      
      // Move to the next set of questions or show a success message
      if (currentIndex + 10 < questions.length) {
        setCurrentIndex(currentIndex + 10);
      } else {
        alert('All questions submitted successfully!');
        // Optionally, reset or redirect
        setQuestions(Array(10).fill({
          question: '',
          options: ['', '', '', ''],
          correctAnswer: '',
          className: '',
          subject: '',
          createdDate: '',
          lecturer: ''
        }));
        setCurrentIndex(0);
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 10);
    }
  };

  const handleNext = () => {
    if (currentIndex + 10 < questions.length) {
      setCurrentIndex(currentIndex + 10);
    } else {
      handleSubmit(new Event('submit')); // Trigger form submission if at the last set
    }
  };

  return (
    <div className="flex h-screen">
      <SidebarTeacher />
      <div className="flex-1 h-screen overflow-y-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-3">Create MCQ Questions</h2>
          <form onSubmit={handleSubmit}>
            {questions.slice(currentIndex, currentIndex + 10).map((questionData, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Question {currentIndex + idx + 1}</h3>
                {currentIndex + idx === 0 ? (
                  <div className="flex flex-wrap -mx-1 mb-3">
                    <div className="w-full md:w-1/2 px-1 mb-3 md:mb-0">
                      <label htmlFor={`className${idx}`} className="block text-gray-700 font-bold mb-1">Class:</label>
                      <input
                        id={`className${idx}`}
                        type="text"
                        className="w-full px-2 py-1 border rounded-lg text-sm"
                        value={questionData.className}
                        onChange={(e) => handleFieldChange('className', e.target.value)}
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-1">
                      <label htmlFor={`subject${idx}`} className="block text-gray-700 font-bold mb-1">Subject:</label>
                      <input
                        id={`subject${idx}`}
                        type="text"
                        className="w-full px-2 py-1 border rounded-lg text-sm"
                        value={questionData.subject}
                        onChange={(e) => handleFieldChange('subject', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                ) : null}
                {currentIndex + idx === 0 ? (
                  <div className="flex flex-wrap -mx-1 mb-3">
                    <div className="w-full md:w-1/2 px-1 mb-3 md:mb-0">
                      <label htmlFor={`createdDate${idx}`} className="block text-gray-700 font-bold mb-1">Created Date:</label>
                      <input
                        id={`createdDate${idx}`}
                        type="date"
                        className="w-full px-2 py-1 border rounded-lg text-sm"
                        value={questionData.createdDate}
                        onChange={(e) => handleFieldChange('createdDate', e.target.value)}
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-1">
                      <label htmlFor={`lecturer${idx}`} className="block text-gray-700 font-bold mb-1">Lecturer:</label>
                      <input
                        id={`lecturer${idx}`}
                        type="text"
                        className="w-full px-2 py-1 border rounded-lg text-sm"
                        value={questionData.lecturer}
                        readOnly
                      />
                    </div>
                  </div>
                ) : null}
                <div className="mb-3">
                  <label htmlFor={`question${idx}`} className="block text-gray-700 font-bold mb-1">Question:</label>
                  <textarea
                    id={`question${idx}`}
                    className="w-full px-2 py-1 border rounded-lg text-sm"
                    value={questionData.question}
                    onChange={(e) => handleFieldChange('question', e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-gray-700 font-bold mb-1">Options:</label>
                  {questionData.options.map((option, index) => (
                    <input
                      key={index}
                      type="text"
                      className="w-full px-2 py-1 border rounded-lg mb-1 text-sm"
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      required
                    />
                  ))}
                </div>
                <div className="mb-3">
                  <label htmlFor={`correctAnswer${idx}`} className="block text-gray-700 font-bold mb-1">Correct Answer:</label>
                  <input
                    id={`correctAnswer${idx}`}
                    type="text"
                    className="w-full px-2 py-1 border rounded-lg text-sm"
                    value={questionData.correctAnswer}
                    onChange={(e) => handleFieldChange('correctAnswer', e.target.value)}
                    required
                  />
                </div>
              </div>
            ))}
            <div className="flex justify-between mb-3">
              
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm"
              >
                {currentIndex + 10 >= questions.length ? 'Submit' : 'Next'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMCQQuestion;
