import React, { useState, useEffect } from 'react';
import './UpdateProductModal.css';

const UpdateProductModal = ({ product, isOpen, onClose, onSubmit, categories }) => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '', // This will now store category ID, not name
    brand: '',
    featured: false,
    image: null,
  });

  console.log("product data from udpate modal", product)
  useEffect(() => {
    if (product) {
      setProductData({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category_id, // Ensure this matches the option values in the dropdown
        brand: product.brand,
        featured: product.featured,
        image: product.image,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setProductData({ ...productData, [name]: checked });
    } else if (type === 'file') {
      setProductData({ ...productData, image: files[0] });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (!productData.name || !productData.price || !productData.stock) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('stock', productData.stock);
    formData.append('category', productData.category); // Submit category ID
    formData.append('brand', productData.brand);
    formData.append('featured', productData.featured);
    if (productData.image instanceof File) {
      formData.append('image', productData.image);
    }

    onSubmit(product.id, formData); // Submit the updated data
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Update Product</h3>
        <div className="form-grid">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Product Name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            placeholder="Price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
          />

          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            placeholder="Stock"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            required
          />

          {/* Category Dropdown - Now stores category ID */}
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={productData.category} // Preselect category ID based on product data
            onChange={handleChange}
            required
          >
            <option value="">
              {categories.find((category) => category.id === product.category)?.name || "Select Category"}
            </option>

            {categories && categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {/* <select
            id="category"
            name="category"
            value={productData.category} // Preselect the category ID
            onChange={handleChange}
            required
          >
            {categories && categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select> */}



          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            id="brand"
            placeholder="Brand"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
          />

          <label className="full-width">
            <input
              type="checkbox"
              name="featured"
              checked={productData.featured}
              onChange={handleChange}
            />
            Featured
          </label>

          <label htmlFor="image" className="full-width">Product Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="full-width"
          />

          <label htmlFor="description" className="full-width">Description:</label>
          <textarea
            id="description"
            placeholder="Description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="full-width"
          />
        </div>

        <div className="modal-buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductModal;
