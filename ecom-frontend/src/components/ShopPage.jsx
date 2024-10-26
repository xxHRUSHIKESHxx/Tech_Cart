import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductList from './ProductList';
import api from '../apis/api';
import { addCartItemThunk, fetchCartItemsThunk } from '../redux/CartSlice';
import { searchProducts, fetchProductsByCategory } from '../apis/adminapis';
import '../styles/categories.css';
import '../styles/ShopPage.css';
import { FaShoppingCart } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const wishlist = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    // Fetch cart items immediately when the shop page loads
    dispatch(fetchCartItemsThunk());

    const fetchProducts = async () => {
      try {
        const response = await api.get(`/products/?page=${currentPage}&category=${category}`);
        setProducts(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 10));
        toast.success('Products fetched successfully!', {
          autoClose: 2000,
        });
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Error fetching products!', {
          autoClose: 2000,
        });
      }
    };

    fetchProducts();
  }, [dispatch, currentPage, category]);

  const searchCatHandler = async (categoryId) => {
    try {
      const response = await fetchProductsByCategory(categoryId); // Fetch products by category ID
      if (Array.isArray(response.results)) {
        setProducts(response.results);
        setTotalPages(Math.ceil(response.count / 10)); // Update total pages based on response count
        setCurrentPage(1);
      } else {
        console.error('Unexpected API response:', response);
        toast.error('Error searching products!', {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('Error searching products:', error);
      toast.error('Error searching products!', {
        autoClose: 2000,
      });
    }
  };


  const searchProductsHandler = async () => {
    try {
      const response = await searchProducts(searchQuery);
      if (Array.isArray(response)) {
        setProducts(response);
        setTotalPages(Math.ceil(response.length / 10));
        setCurrentPage(1);
      } else {
        console.error('Unexpected API response:', response);
        toast.error('Error searching products!', {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('Error searching products:', error);
      toast.error('Error searching products!', {
        autoClose: 2000,
      });
    }
  };




  const filterByCategory = (selectedCategory) => {
    setCategory(selectedCategory);
    setSearchQuery(selectedCategory === 'all' ? '' : selectedCategory); // Set searchQuery only if not 'all'
    if (selectedCategory === 'all') {
      setCurrentPage(1); // Reset to first page
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addCartItemThunk({ productId: product.id, quantity: 1 }));
    toast.success(`${product.name} added to cart!`, {
      autoClose: 2000,
    });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchProductsHandler(); // Call the searchProductsHandler function
  };

  return (
    <div className="shop-page">
      <ToastContainer />

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      <div className="category-container">
        <div
          className={`category-block ${category === 'laptop' ? 'active' : ''}`}
          onClick={() => {
            setCategory('laptop');
            searchCatHandler(1); // Pass the category ID for laptops (2)
          }}
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/129208/pexels-photo-129208.jpeg?auto=compress&cs=tinysrgb&w=600)',
          }}
        >
          <span className="category-name">Laptops</span>
        </div>
        <div
          className={`category-block ${category === 'mobile' ? 'active' : ''}`}
          onClick={() => {
            setCategory('mobile');
            searchCatHandler(4); // Pass the category ID for mobile phones (3)
          }}
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=600)',
          }}
        >
          <span className="category-name">Phones</span>
        </div>
        <div
          className={`category-block ${category === 'headphones' ? 'active' : ''}`}
          onClick={() => {
            setCategory('headphones');
            searchCatHandler(7); // Pass the category ID for headsets (4)
          }}
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/5658529/pexels-photo-5658529.jpeg?auto=compress&cs=tinysrgb&w=600)',
          }}
        >
          <span className="category-name">Headsets</span>
        </div>
      </div>



      <ProductList
        products={products}
        addToCart={handleAddToCart}
      />

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          className="prev-button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          &laquo; {/* Left Arrow for Previous */}
        </button>

        <span className="current-page">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="next-button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          &raquo; {/* Right Arrow for Next */}
        </button>
      </div>
    </div>
  );
};

export default ShopPage;
