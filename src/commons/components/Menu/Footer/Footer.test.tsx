import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './';

test('renders Footer component', () => {
  const { asFragment }  = render(<Footer />);
  const footerElement = screen.getByText(/Anderson Lima/i);
  expect(footerElement).toBeTruthy();
  expect(asFragment()).toMatchSnapshot();
});