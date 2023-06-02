import React, { useState, useEffect } from "react";

const EditPost = ({ id }) => {
  const [newName, setNewName] = useState("");
  const [newShoeFeatures, setNewShoeFeatures] = useState("");
  const [newMaterialQuality, setNewMaterialQuality] = useState("");
  const [newSizesAccesories, setNewSizesAccesories] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newImagePath, setNewImagePath] = useState("");

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/products/{id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          shoeFeatures: newShoeFeatures,
          materialQuality: newMaterialQuality,
          sizesAccesories: newSizesAccesories,
          price: newPrice,
          category: newCategory,
          imagePath: newImagePath,
        }),
      });

      if (response.ok) {
        console.log("Post updated successfully");
        // Do something after successful update
      } else {
        throw new Error("Failed to update post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
  <div ClassName="card"> 
    <h1>Edit Post</h1> 
    <div cCame="input-group">          
      <div>
          <label>Name:</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
      </div>
      <div>
          <label>Shoe Features:</label>
          <input
            type="text"
            value={newShoeFeatures}
            onChange={(e) => setNewShoeFeatures(e.target.value)}
            required
          />
      </div>
      <div>
          <label>Material Quality:</label>
          <input
            type="text"
            value={newMaterialQuality}
            onChange={(e) => setNewMaterialQuality(e.target.value)}
            required
          />
      </div>
      <div>
          <label>Sizes & Accessories:</label>
          <input
            type="text"
            value={newSizesAccesories}
            onChange={(e) => setNewSizesAccesories(e.target.value)}
            required
          />
      </div>
      <div>
          <label>Price:</label>
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            required
          />
      </div>
      <div>
          <label>Category:</label>
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Sale">Sale</option>
          </select>
      </div>
      <div>
          <label>Picture:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewImagePath(e.target.files[0])}
            required
          />
      </div>
    </div>
    <div ClassName="post-button">
       <button type="submit">Post</button>
    </div>
  </div>
</form>
);
};

export default EditPost;