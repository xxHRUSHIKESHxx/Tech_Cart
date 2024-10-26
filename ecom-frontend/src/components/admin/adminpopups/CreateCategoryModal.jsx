// src/components/adminpopups/CreateCategoryModal.js
import React, { useState } from 'react';
import { createCategory } from '../../../apis/adminapis'; // Import the new API function
import './CreateCategoryModal.css';

const CreateCategoryModal = ({ isOpen, onClose, onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName) {
      setError('Category name cannot be empty.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const newCategory = await createCategory(categoryName); // Call the API function
      onCategoryAdded(newCategory); // Pass the new category back to the parent component
      setCategoryName(''); // Reset the input field
      onClose(); // Close the modal
    } catch (error) {
      setError('Failed to create category.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="modal-actions">
            <button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Category'}
            </button>
            <button type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryModal;
