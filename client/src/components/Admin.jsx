import React, { useState } from 'react';

function AdminFunctions({ setAdmin, secretKey })  {
    const [inputSecretKey, setInputSecretKey] = useState('');


  const adminLogin = async (e) => {
    e.preventDefault();

    try {
      if (inputSecretKey !== secretKey)
       {
        alert('Invalid Admin');
      } 
      else {
        setAdmin(true);
        localStorage.setItem('admin', true);
        alert('Admin Code Authentication');
      }
    } 
    catch (error) {
      console.error(error);
      alert('Error: Failed to authenticate admin');
    }
  };
}

export default AdminFunctions;