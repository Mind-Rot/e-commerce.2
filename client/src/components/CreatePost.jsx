import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import { createProduct } from "../api/products";
import '../css/CreateForm.css';


const CreatePost = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [shoeFeatures, setShoeFeatures] = useState("");
  const [materialQuality, setMaterialQuality] = useState("");
  const [sizesAccesories, setSizesAccesories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imagePath, setImagePath] = useState(null);

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("Values:", name, shoeFeatures, materialQuality, sizesAccesories, price, category, imagePath);

    try {
      await createProduct(
        name,
        shoeFeatures,
        materialQuality,
        sizesAccesories,
        price,
        category,
        imagePath
      );
      console.log("Product created successfully");
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };
  
  
    return (
      <form className="form" onSubmit={handleSubmit()}>
    <div ClassName="card"> 
      <h1>Create Post</h1> 
      <div cCame="input-group">          
        <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
        </div>
        <div>
            <label>Shoe Features:</label>
            <input
              type="text"
              value={shoeFeatures}
              onChange={(e) => setShoeFeatures(e.target.value)}
              required
            />
        </div>
        <div>
            <label>Material Quality:</label>
            <input
              type="text"
              value={materialQuality}
              onChange={(e) => setMaterialQuality(e.target.value)}
              required
            />
        </div>
        <div>
            <label>Sizes & Accessories:</label>
            <input
              type="text"
              value={sizesAccesories}
              onChange={(e) => setSizesAccesories(e.target.value)}
              required
            />
        </div>
        <div>
            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
        </div>
        <div>
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              onChange={(e) => setImagePath(e.target.files[0])}
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


export default CreatePost;