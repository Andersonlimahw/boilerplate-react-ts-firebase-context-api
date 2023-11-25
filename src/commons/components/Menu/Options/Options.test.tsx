import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Options } from './';

describe('Options component', () => {
 it('should call the handleClick function when clicked', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(<Options handleClick={handleClick} />);

    fireEvent.click(getByTestId('options-icon'));

    expect(handleClick).toHaveBeenCalledTimes(1);
 });
 it('renders Options component correctly', () => {
  const handleClick = jest.fn();
  const { asFragment } = render(<Options  handleClick={handleClick} />);
  expect(asFragment()).toMatchSnapshot();
 });
});