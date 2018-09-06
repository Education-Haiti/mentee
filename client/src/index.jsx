// import React from 'react';
// import ReactDOM from 'react-dom';
// import MenteeDashboard from './components/MenteeDashboard/MenteeDashboard.jsx';

//  ReactDOM.render(<MenteeDashboard/>, document.getElementById('mentee'));

 import React from 'react';
 import ReactDOM from 'react-dom';
 import Mentee from './components/Mentee.jsx';
 
 const links = [
     { label: 'Home', url: 'www.google.com'},
     { label: 'My Info', url: 'www.google.com'},
     { label: 'Peers', url: 'www.google.com'},
     { label: 'My Mentor', url: 'www.google.com'},
 ]
 
 const demoMentor = {
     first_name: 'SuperSuccessful',
     last_name: 'Mentor',
     field_of_study: 'Underwater basket weaving',
     university: 'University of Notre Dame', 
     email: 'dopeEmail@gmail.com',
     phone: '123-456-7890',
     photo: 'https://picsum.com.photos/200/200'
 }
 
 const demoMentee ={
     first_name: 'Hardworking',
     last_name: 'Haitian-Student',
     sex: 'Female',
     email: 'dopeStudent@gmail.com',
     phone_number:'123-456-7890',
     hometown: 'Site Soley',
     school: 'Vertil International School',
     grade: '12',
     photo: 'https://picsum.com.photos/200/200',
     parent1_name: 'JayPee Vertil',
     parent1_phone:'000-000-0000',
     parent1_email: 'GoodCop@parents.com',
     parent2_name: 'Cheybee Vertil',
     parent2_phone:'111-111-1111',
     parent2_email: 'BadCop@parents.com',
 }
 
 ReactDOM.render(<Mentee links={links} mentor={demoMentor} user={demoMentee}/>, document.getElementById('mentee'));