import React, { useState } from "react";
import DeletePost from "./DeletePost";

const DeletePostButton = ({ id, token }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleDeletePostButtonClick = () => {
   if (user.role === 'admin') {
  // User is an admin
  var isAdmin = true;
} else {
  // User is not an admin
  var isAdmin = false;
}
  };

  return (
    <div>
      <button onClick={handleDeletePostButtonClick}>Check Admin Status</button>
      {isAdmin && <DeletePostButton id={id} token={token} isAdmin={isAdmin} />}
    </div>
  );
};

export default AdminButton;