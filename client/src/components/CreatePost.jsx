import React, { useState } from "react";



const CreatePost = () => {
  const [name, setName] = useState("");
  const [shoeFeatures, setShoeFeatures] = useState("");
  const [materialQuality, setMaterialQuality] = useState("");
  const [sizesAccesories, setSizesAccesories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = window.localStorage.getItem("token");

      if (!token) {
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("shoeFeatures", shoeFeatures);
      formData.append("materialQuality", materialQuality);
      formData.append("sizesAccesories", sizesAccesories);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("image", image);

      const response = await fetch(`${BASE_URL}/products/admin/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const createdProduct = await response.json();
      console.log("Product added successfully:", createdProduct);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {showForm && (
        <>
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
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <button type="submit">Post</button>
        </>
      )}
      {!showForm && <button onClick={handleClick}>Create Post</button>}
    </form>
  );
};

export default CreatePost;