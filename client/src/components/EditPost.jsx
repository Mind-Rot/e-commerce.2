import React, { useState, useEffect } from "react";

const EditPost = ({ postId }) => {
  const [name, setName] = useState("");
  const [shoeFeatures, setShoeFeatures] = useState("");
  const [materialQuality, setMaterialQuality] = useState("");
  const [sizesAccesories, setSizesAccesories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`/products/${postId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post data");
        }
        const postData = await response.json();
        setName(postData.name);
        setShoeFeatures(postData.shoeFeatures);
        setMaterialQuality(postData.materialQuality);
        setSizesAccesories(postData.sizesAccesories);
        setPrice(postData.price);
        setCategory(postData.category);
        setImagePath(postData.imagePath);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPostData();
  }, [postId]);

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

      const updateData = {
        name: name || undefined,
        shoeFeatures: shoeFeatures || undefined,
        materialQuality: materialQuality || undefined,
        sizesAccesories: sizesAccesories || undefined,
        price: price || undefined,
        category: category || undefined,
        imagePath: imagePath || undefined,
      };

      const response = await fetch(`${BASE_URL}/products/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Failed to update the post");
      }

      const updatedPost = await response.json();
      console.log("Post updated successfully:", updatedPost);
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
            />
          </div>
          <div>
            <label>Shoe Features:</label>
            <input
              type="text"
              value={shoeFeatures}
              onChange={(e) => setShoeFeatures(e.target.value)}
            />
          </div>
          <div>
            <label>Material Quality:</label>
            <input
              type="text"
              value={materialQuality}
              onChange={(e) => setMaterialQuality(e.target.value)}
            />
          </div>
          <div>
            <label>Sizes & Accessories:</label>
            <input
              type="text"
              value={sizesAccesories}
              onChange={(e) => setSizesAccesories(e.target.value)}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label>Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <label>Picture:</label>
            <input
              type="text"
              value={imagePath}
              onChange={(e) => setImagePath(e.target.value)}
            />
          </div>
          <button type="submit">Update Post</button>
        </>
      )}
      {!showForm && <button onClick={handleClick}>Edit Post</button>}
    </form>
  );
};

export default EditPost;