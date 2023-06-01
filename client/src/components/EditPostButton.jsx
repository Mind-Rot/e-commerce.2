import React, { useState } from "react";
import EditPost from "./EditPost";


const EditPostButton = ({  postId }) => {
    const [showForm, setShowForm] = useState(false);
  
    const handleClick = () => {
      setShowForm(true);
    };
  
    return (
      <div>
        {  !showForm && (
          <button onClick={handleClick}>Edit Post</button>
        )}
        {showForm && <EditPost postId={postId} />}
      </div>
    );
  };

  export default EditPostButton;