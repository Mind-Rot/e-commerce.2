import React, { useState } from "react";
import EditPost from "./EditPost";


const EditPostButton = ({ isAdmin, postId }) => {
    const [showForm, setShowForm] = useState(false);
  
    const handleClick = () => {
      setShowForm(true);
    };
  
    return (
      <div>
        {isAdmin && !showForm && (
          <button onClick={handleClick}>Edit Post</button>
        )}
        {showForm && <EditPost postId={postId} />}
      </div>
    );
  };

  export default EditPostButton