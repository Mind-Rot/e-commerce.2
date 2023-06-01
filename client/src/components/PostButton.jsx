import React, { useState } from "react";
import CreatePost from "./CreatePost";

const PostButton = () => {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  return (
    <div>
      {!showForm && (
        <button onClick={handleClick}>Create Post</button>
      )}
      {showForm && <CreatePost />}
    </div>
  );
};

export default PostButton;
