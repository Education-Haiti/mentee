 import React from 'react';
 import ReactDOM from 'react-dom';
 import Mentee from './components/Mentee.jsx';
 import MentorDashboard from './components/MentorDashboard/Mentordashboard.jsx';
 import WarningsSummary from './components/Warnings/WarningsSummary.jsx';
 import GiveWarning from './components/Warnings/GiveWarning.jsx';
 import MyProfile from './components/MyProfile/MyProfile.jsx';

 
 const demoMentor = {
     full_name: 'Successful Mentor',
     majors: 'Underwater basket weaving',
     undergraduate_school: 'University of Notre Dame',
     graduate_school: 'Harharharvard University', 
     email: 'dopeEmail@gmail.com',
     phone_number: '123-456-7890',
     photo: 'https://picsum.photos/200/200'
 }
 
 const demoMentee ={
     full_name: 'Hardworking Mentee',
     sex: 'Female',
     email: 'dopeStudent@gmail.com',
     phone_number:'123-456-7890',
     hometown: 'Site Soley',
     school: 'Vertil International School',
     grade: '12',
     photo: 'https://picsum.photos/200/200',
     parent1_name: 'JayPee Vertil',
     parent1_phone:'000-000-0000',
     parent1_email: 'GoodCop@parents.com',
     parent2_name: 'Cheybee Vertil',
     parent2_phone:'111-111-1111',
     parent2_email: 'BadCop@parents.com',
 }
 
ReactDOM.render(<Mentee/>, document.getElementById('mentee'));
//ReactDOM.render(<MentorDashboard/>, document.getElementById('mentee'));
//ReactDOM.render(<WarningsSummary/>, document.getElementById('mentee'));
//ReactDOM.render(<GiveWarning/>, document.getElementById('mentee'));
