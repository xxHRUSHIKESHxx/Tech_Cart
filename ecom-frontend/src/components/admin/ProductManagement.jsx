import React, { useEffect, useState } from 'react';
import '../../styles/ProductManagement.css';
import { fetchProducts, searchProducts, deleteProduct, updateProduct, getAllCategories } from '../../apis/adminapis';
import { MAIN_API } from '../../apis/mainapi';
import AddProductModal from './adminpopups/AddProductModal';
import UpdateProductModal from './adminpopups/UpdateProductModal';
import CreateCategoryModal from './adminpopups/CreateCategoryModal';
import { ToastContainer, toast } from 'react-toastify'; // Import toast components
import 'react-toastify/dist/ReactToastify.css'; // Import the toastify CSS

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        await loadProducts(currentPage);
      } catch (error) {
        console.error('Error loading products:', error);
        toast.error('Error loading products');
      }
    };

    fetchData();
  }, [currentPage]);

  const loadProducts = (page) => {
    setLoading(true);
    fetchProducts(page)
      .then((data) => {
        setProducts(data.results);
        setTotalPages(Math.ceil(data.count / 10));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Error fetching products.');
        toast.error('Error fetching products.');
        setLoading(false);
      });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Error fetching products.');
        toast.error('Error fetching products.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const all_catagories = await getAllCategories();
      setCategories(all_catagories);
    };

    fetchCategories();
  }, []);

  const handleSearch = () => {
    if (!searchTerm && !category) {
      setError('Please enter a search term or category to filter products.');
      toast.warn('Please enter a search term or category to filter products.');
      return;
    }

    setLoading(true);
    setError('');

    searchProducts(searchTerm, category)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Error searching for products.');
        toast.error('Error searching for products.');
        setLoading(false);
      });
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
        toast.success('Product deleted successfully.');
      })
      .catch((err) => {
        console.error(err);
        setError('Error deleting product.');
        toast.error('Error deleting product.');
      });
  };

  const handleUpdateProduct = (id) => {
    const product = products.find((p) => p.id === id);
    setSelectedProduct(product);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSubmit = (id, updatedData) => {
    updateProduct(id, updatedData)
      .then((updatedProduct) => {
        setProducts((prevProducts) =>
          prevProducts.map((product) => (product.id === id ? updatedProduct : product))
        );
        setIsUpdateModalOpen(false);
        toast.success('Product updated successfully.');
      })
      .catch((err) => {
        console.error(err);
        setError('Error updating product.');
        toast.error('Error updating product.');
      });
  };

  const handleCategoryAdded = (newCategory) => {
    console.log('New category added:', newCategory);
    toast.success('Category added successfully.');
  };

  return (
    <div className="product-management">
      <ToastContainer /> {/* Toast container to display notifications */}
      <h2>Product Management</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="add-buttons">
        <button className="addbuttons" onClick={() => setIsModalOpen(true)}>
          Add Product
        </button>
        <button className="addbuttons" onClick={() => setIsCategoryModalOpen(true)}>
          Create Category
        </button>
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductAdded={(newProduct) => {
          setProducts((prev) => [...prev, newProduct]);
          toast.success('Product added successfully.');
        }}
        categories={categories}
      />

      <UpdateProductModal
        product={selectedProduct}
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdateSubmit}
        categories={categories}
      />

      <CreateCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onCategoryAdded={handleCategoryAdded}
      />

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length > 0 ? (
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                className="product-image"
                src={`${MAIN_API}${product.image}`}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button className="prodDltBtn" onClick={() => handleDeleteProduct(product.id)}>
                Delete
              </button>
              <button className="prodUpdBtn" onClick={() => handleUpdateProduct(product.id)}>
                Update
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}

      <div className="pagination-controls">
        <button
          disabled={currentPage === 1}
          onClick={goToPreviousPage}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={goToNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductManagement;
