import React, { useState } from 'react';
import { addProduct } from '../../../apis/adminapis'; // Import the addProduct function
import './AddProductModal.css';
 
const AddProductModal = ({ isOpen, onClose, onProductAdded, categories }) => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    brand: '',
    featured: false,
    image: null,
  });
  const [error, setError] = useState('');
 
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setProductData({ ...productData, [name]: checked });
    } else if (type === 'file') {
      setProductData({ ...productData, image: files[0] }); // Handle file input
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };
 
  const handleSubmit = () => {
    if (!productData.name || !productData.price || !productData.stock) {
      setError('Please fill in all required fields.'); // Basic validation
      return;
    }
 
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('stock', productData.stock);
    formData.append('category', productData.category);
    formData.append('brand', productData.brand);
    formData.append('featured', productData.featured);
    formData.append('image', productData.image); // Append the image file
 
 
    // Call the addProduct API and handle success or failure
    addProduct(formData)
      .then((newProduct) => {
        onProductAdded(newProduct); // Pass the new product to the parent
        onClose(); // Close the modal
        setError(''); // Clear any previous errors
      })
      .catch((err) => {
        console.error(err);
        setError('Error adding product.'); // Update error state
      });
  };
 
  if (!isOpen) return null;
 
  return (
<div className="modal-overlay">
<div className="modal-content">
<h3>Add New Product</h3>
        {error && <div className="error-message">{error}</div>}
<input
          type="text"
          placeholder="Product Name"
          name="name"
          value={productData.name}
          onChange={handleChange}
          required
        />
<textarea
          placeholder="Description"
          name="description"
          value={productData.description}
          onChange={handleChange}
        />
<input
          type="number"
          placeholder="Price"
          name="price"
          value={productData.price}
          onChange={handleChange}
          required
        />
<input
          type="number"
          placeholder="Stock"
          name="stock"
          value={productData.stock}
          onChange={handleChange}
          required
        />
        {/* <input
          type="text"
          placeholder="Category"
          name="category"
          value={productData.category}
          onChange={handleChange}
        /> */}
<select
          id="category"
          name="category"
          value={productData.category} // Set selected category
          onChange={handleChange}
          required
>
<option value="">Select Category</option>
          {categories && categories.map((category) => (
<option key={category.id} value={category.id}>
              {category.name}
</option>
          ))}
</select>
<input
          type="text"
          placeholder="Brand"
          name="brand"
          value={productData.brand}
          onChange={handleChange}
        />
<label>
<input
            type="checkbox"
            name="featured"
            checked={productData.featured}
            onChange={handleChange}
          />
          Featured
</label>
<input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*" // Optional: restrict to image files
        />
 
        <div className="modal-buttons">
<button onClick={handleSubmit}>Submit</button>
<button onClick={onClose}>Cancel</button>
</div>
</div>
</div>
  );
};
 
export default AddProductModal;