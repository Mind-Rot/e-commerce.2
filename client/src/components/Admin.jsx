import React from 'react';

const Admin = ({ isAdmin, children }) => {
  if (!isAdmin) {
    return null; // Return null or render an error message if the user is not an admin
  }

  return <>{children}</>; // Render the wrapped components if the user is an admin
};

export default Admin;