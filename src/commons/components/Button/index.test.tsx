import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './';

test('renders button with correct text', () => {
  render(<Button>Hello</Button>);
  const buttonElement = screen.getByText(/Hello/i);
  expect(buttonElement).toBeDefined();
});

test('applies additional props correctly', () => {
  render(<Button id="myButton" className="custom-class">Click me</Button>);
  const buttonElement = screen.getByText(/Click me/i);

  expect(buttonElement).toMatchSnapshot();
});

// Add more tests as needed
