import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Tab } from './';

describe('Tab Component', () => {
  it('renders a tab with default values', () => {
    const { asFragment } = render(<Tab title="Default Tab" handleClick={() => {}} icon={<div />} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders an active tab', () => {
    const { asFragment } = render(<Tab title="Active Tab" active handleClick={() => {}} icon={<div />} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls handleClick when the tab is clicked', () => {
    const handleClickMock = jest.fn();
    const { getByText } = render(<Tab title="Clickable Tab" handleClick={handleClickMock} icon={<div />} />);
    fireEvent.click(getByText('Clickable Tab'));
    expect(handleClickMock).toHaveBeenCalled();
  });

  it('renders a tab with a custom icon', () => {
    const { asFragment } = render(<Tab title="Custom Icon Tab" handleClick={() => {}} icon={<span>Custom Icon</span>} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
