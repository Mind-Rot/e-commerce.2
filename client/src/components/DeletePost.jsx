import React from "react";

const DeletePost = ({ id, token, isAdmin }) => {
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
        console.log('Post deleted successfully');
      } else {
        throw new Error("Failed to remove post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!isAdmin) {
    return null; // Render nothing if not an admin
  }

  return (
    <button className="delete" onClick={handleRemove}>
      Delete Post
    </button>
  );
};

export default DeletePost;

export async function updateProduct(
  id,
  name, 
  shoeFeatures, 
  materialQuality, 
  sizesAccesories, 
  price, 
  category, 
  imagePath
) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name, 
        shoeFeatures, 
        materialQuality, 
        sizesAccesories, 
        price, 
        category, 
        imagePath
      }),
    });
    return response.status === 204;
  } catch (error) {
    console.error(error.message || "Failed to update product");
  }
}