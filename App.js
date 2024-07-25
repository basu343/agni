// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginpage';
import './index.js'
import Homepage from './pages/homepage.js';
import Studentdash from './pages/studentdash.js';
import AdminDash from './pages/admindash.js';

import ManageStudent from './pages/managestudent.js';
import ManageTeacher from './pages/manageteacher.js';
import OnlineExam from './pages/onlineexam.js';
import AddStudent from './pages/addstudent.js';
import AddTeacher from './pages/addteacher.js';
import Questions from './pages/questions.js';
import ManageStudentT from './pages/managestudentT.js';
import OnlineExamT from './pages/onlineexamT.js';
import AddStudentT from './pages/addstudentT.js';
import CourseMaterial from './pages/coursematerial.js';
import QuestionPageT from './pages/questionpageT.js';
import CourseMaterialsPage from './pages/student/coursematerials.js';
import ExamPage from './pages/student/exampage.js';
import ResultPage from './pages/student/result.js';
import QuestionsT from './pages/teacher/questionsT.js';
import CreateMCQQuestion from './pages/teacher/createMCQ.js';
import CreateSubjectiveQuestion from './pages/teacher/createSubjectiveQuestion.js';
import UploadCourseMaterial from './pages/teacher/uploadCoursematerial.js';
import TakeExamPage from './pages/student/takeexampage.js';
import SubjectiveExamPage from './pages/student/takeexamsubjective.js';
import SubmittedExamPage from './pages/teacher/submittedexam.js';
import CheckSubjectivePage from './pages/teacher/checksubjective.js';
import EditStudent from './pages/admin/editstudent.js';
import EditTeacher from './pages/admin/editteacher.js';
import EditStudentT from './pages/teacher/editstudentT.js';
import TeacherDash from './pages/teacherdash.js';
import CreateExamPage from './pages/teacher/createexam.js';







export default function App() {
  
  return (
    <BrowserRouter>
    
    <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/login" element={<LoginPage/>}/>
        
        <Route path="/studentdash" element={<Studentdash/>}/>
        <Route path="/admindash" element={<AdminDash/>}/>
        <Route path= "/teacherdash" element={<TeacherDash/>}/>
        <Route path= "/loginpage" element={<LoginPage/>}/>
        <Route path= "/managestudent" element={<ManageStudent/>}/>
        <Route path= "/manageteacher" element={<ManageTeacher/>}/>
        <Route path= "/onlineexam" element={<OnlineExam/>}/>
        <Route path= "/addstudent" element={<AddStudent/>}/>
        <Route path= "/addteacher" element={<AddTeacher/>}/>
        <Route path= "/questions" element={<Questions/>}/>
        <Route path= "/managestudentT" element={<ManageStudentT/>}/>
        <Route path= "/onlineexamT" element={<OnlineExamT/>}/>
        <Route path= "/addstudentT" element={<AddStudentT/>}/>
        <Route path= "/coursematerial" element={<CourseMaterial/>}/>
        <Route path= "/questionpageT" element={<QuestionPageT/>}/>
        <Route path= "/coursematerials" element={<CourseMaterialsPage/>}/>
        <Route path= "/exampage" element={<ExamPage/>}/>
        <Route path= "/result" element={<ResultPage/>}/>
        <Route path= "/questionsT" element={<QuestionsT/>}/>
        <Route path= "/createMCQ" element={<CreateMCQQuestion/>}/>
        <Route path= "/createSubjectiveQuestion" element={<CreateSubjectiveQuestion/>}/>
        <Route path= "/uploadCourseMaterial" element={<UploadCourseMaterial/>}/>
        <Route path= "/takeexampage" element={<TakeExamPage/>}/>
        <Route path= "/takeexamsubjective" element={<SubjectiveExamPage/>}/>
        <Route path= "/submittedexam" element={<SubmittedExamPage/>}/>
        <Route path= "/checksubjective" element={<CheckSubjectivePage/>}/>
        <Route path= "/editstudent/:id" element={<EditStudent/>}/>
        <Route path= "/editteacher/:id" element={<EditTeacher/>}/>
        <Route path= "/editstudentT/:id" element={<EditStudentT/>}/>
        <Route path= "/createexam" element={<CreateExamPage/>}/>

        </Routes>
    
      
       
      
    </BrowserRouter>

    
  );
}
