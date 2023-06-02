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

  



  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((!newImagePath.endsWith('.png')) && (!newImagePath == undefined)) {
      console.error('Please provide a valid PNG image path.');
      return;
    }

    try {
      await updateProduct(
        newName,
        newShoeFeatures, // Update the variable name to match the state variable
        newMaterialQuality,
        newSizesAccesories,
        newPrice,
        newCategory,
        newImagePath,
      );
      // Handle success or redirect to another page
      console.log('Product created successfully!');// this pops out
    } catch (error) {
      // Handle error
      console.error('Failed to create product:', error);
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
    const fieldsWithValue = [
      newName,
      newShoeFeatures,
      newMaterialQuality,
      newSizesAccesories,
      newPrice,
      newCategory,
      newImagePath,
    ].filter((field) => field !== "");

    setIsFormValid(fieldsWithValue.length >= 1);
  }, [
    newName,
    newShoeFeatures,
    newMaterialQuality,
    newSizesAccesories,
    newPrice,
    newCategory,
    newImagePath,
  ]);


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
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="sale">Sale</option>
            </select>
          </div>
          <div>
            <label>Picture (png):</label>
            <input 
            type="text" 
            value={newImagePath} 
            onChange={(e) => setNewImagePath(e.target.value)} 
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