import React from "react";


const deletePost = ({ id, token }) => {
  const handleRemove = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log('Product deleted successfully');

      } else {
        throw new Error("Failed to remove product");
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <button class="delete" onClick={handleRemove}>Delete Post</button>;
};

export default deletePost;