import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = ({ products, setProducts }) => {
  const { productId } = useParams();  // Get product ID from the URL
  const navigate = useNavigate();
  
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
  });

  useEffect(() => {
    const productToEdit = products.find((product) => product.id === parseInt(productId));
    if (productToEdit) {
      setProductData({
        name: productToEdit.name,
        price: productToEdit.price,
        image: productToEdit.image,
        description: productToEdit.description,
      });
    }
  }, [productId, products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedProduct = { ...productData, id: parseInt(productId) };

    // Update product in the products state
    const updatedProducts = products.map((product) =>
      product.id === parseInt(productId) ? updatedProduct : product
    );
    setProducts(updatedProducts);

    // You can also send a request to the server to update the product data
    // await fetch(`http://localhost:3000/products/${productId}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(updatedProduct),
    // });

    navigate('/admin/products'); // Navigate back to the product management page after update
  };

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Product Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={productData.image}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
