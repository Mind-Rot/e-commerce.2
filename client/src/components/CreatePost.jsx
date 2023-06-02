import { useState } from 'react';
import { createProduct } from '../api/products';
import '../css/CreateForm.css'


const CreatePost = () => {
  const [name, setName] = useState('');
  const [shoeFeatures, setShoeFeatures] = useState('');
  const [materialQuality, setMaterialQuality] = useState('');
  const [sizesAccessories, setSizesAccessories] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [imagePath, setImagePath] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imagePath || !imagePath.endsWith('.png')) {
      console.error('Please provide a valid PNG image path.');
      return;
    }

    try {
      await createProduct(
        name,
        shoeFeatures,
        materialQuality,
        sizesAccessories,
        price,
        category,
        imagePath,
      );
      // Handle success or redirect to another page
      console.log('Product created successfully!');
    } catch (error) {
      // Handle error
      console.error('Failed to create product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Shoe Features:
        <input
          type="text"
          value={shoeFeatures}
          onChange={(e) => setShoeFeatures(e.target.value)}
        />
      </label>
      <br />
      <label>
        Material Quality:
        <input
          type="text"
          value={materialQuality}
          onChange={(e) => setMaterialQuality(e.target.value)}
        />
      </label>
      <br />
      <label>
        Sizes & Accessories:
        <input
          type="text"
          value={sizesAccessories}
          onChange={(e) => setSizesAccessories(e.target.value)}
        />
      </label>
      <br />
      <label>
        Price:
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <br />
      <label>
      Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Sale">Sale</option>
        </select>
      </label>
      <br />
      <label>
      Select Photo (PNG only):
      <input type="text" value={imagePath} onChange={(e) => setImagePath(e.target.value)} />
      </label>
      <br />
      <button type="submit">Create Product</button>
    </form>
  );
};

export default CreatePost;