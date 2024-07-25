import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { supabase } from './createClient';
import './index.css';


// Optional: Check if user is authenticated on app load
const checkUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user:', error);
  } else if (user) {
    console.log('User is logged in:', user);
    // Optionally, you can store user information in context or state management here
  }
};

checkUser();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
