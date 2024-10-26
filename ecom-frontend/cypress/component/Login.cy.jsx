import React from 'react';
import { mount } from 'cypress/react18'; // Ensure you're using cypress/react18 for React 18
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for useNavigate
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from '../../src/redux/store'; // Import your Redux store (adjust path if needed)
import Login from '../../src/components/auth/Login'; // Adjust the path to your component

describe('Login Component', () => {
  it('renders the login form correctly', () => {
    // Wrap the Login component in BrowserRouter and Provider
    mount(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    // Wait for the form to be visible
    cy.get('.auth-title').should('be.visible'); // Ensure the title is visible
    cy.get('input[placeholder="Email"]').should('exist'); // Check if email input exists
    cy.get('input[placeholder="Password"]').should('exist'); // Check if password input exists
    cy.get('button').contains('Login').should('exist'); // Check if login button exists
  });
});
