import React from "react";
import { deleteProduct } from "../api/products";

const DeletePost = ({ id, token, isAdmin }) => {
  const handleRemove = async () => {
    try {
      const success = await deleteProduct(id);

      if (success) {
        console.log('Post deleted successfully');
      } else {
        throw new Error("Failed to remove post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button className="delete" onClick={handleRemove}>
      Delete Post
    </button>
  );
};

export default DeletePost;