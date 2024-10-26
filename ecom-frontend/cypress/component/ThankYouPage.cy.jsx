import React from 'react';
import { mount } from 'cypress/react'; // To mount React component
import Login from '../../src/components/auth/Login'; // Adjust the path to your component

describe('thank you Component', () => {
  it('renders the thankyou form ', () => {
    // Mount the component for testing
    mount(<Login />);

  });
});
