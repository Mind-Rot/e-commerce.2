import React, { useState, useEffect } from "react";
import { updateProduct } from "../api/products";


const EditPost = ({ id }) => {
  const [newName, setNewName] = useState("");
  const [newShoeFeatures, setNewShoeFeatures] = useState("");
  const [newMaterialQuality, setNewMaterialQuality] = useState("");
  const [newSizesAccesories, setNewSizesAccesories] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newImagePath, setNewImagePath] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleUpdate = async () => {
    try {
      const success = await updateProduct(
        id,
        newName,
        newShoeFeatures,
        newMaterialQuality,
        newSizesAccesories,
        newPrice,
        newCategory,
        newImagePath
      );

      if (success) {
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
    if (isFormValid) {
      handleUpdate();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setNewName(value);
        break;
      case "shoeFeatures":
        setNewShoeFeatures(value);
        break;
      case "materialQuality":
        setNewMaterialQuality(value);
        break;
      case "sizesAccesories":
        setNewSizesAccesories(value);
        break;
      case "price":
        setNewPrice(value);
        break;
      case "category":
        setNewCategory(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setIsFormValid(
      newName !== "" ||
      newShoeFeatures !== "" ||
      newMaterialQuality !== "" ||
      newSizesAccesories !== "" ||
      newPrice !== "" ||
      newCategory !== "" ||
      newImagePath !== null
    );
  }, [newName, newShoeFeatures, newMaterialQuality, newSizesAccesories, newPrice, newCategory, newImagePath]);


  return (
    <form  onSubmit={handleSubmit}>
      <div >
        <h1>Edit Post</h1>
        <div >
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Shoe Features:</label>
            <input
              type="text"
              name="shoeFeatures"
              value={newShoeFeatures}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Material Quality:</label>
            <input
              type="text"
              name="materialQuality"
              value={newMaterialQuality}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Sizes & Accessories:</label>
            <input
              type="text"
              name="sizesAccesories"
              value={newSizesAccesories}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={newPrice}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Category:</label>
            <select
              name="category"
              value={newCategory}
              onChange={handleInputChange}
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
            />
          </div>
        </div>
        <div >
          <button type="submit">Post</button>
        </div>
      </div>
    </form>
  );
};

export default EditPost;