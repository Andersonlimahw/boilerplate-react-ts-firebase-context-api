import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Modal } from './';

describe('Modal', () => {
    test('renders with default props', () => {
        const { getByText } = render(<Modal id="test" title="Test Modal" content={<p>Test content</p>} isOpen onClose={() => {}} />);
        const title = getByText(/Test Modal/i);
        const content = getByText(/Test content/i);
        const closeButton = getByText(/close/i);

        expect(title).toBeTruthy();
        expect(content).toBeTruthy();
        expect(closeButton).toBeTruthy();
    });

    test('renders with onSubmit prop', () => {
        const handleSubmit = jest.fn();
        const { getByTestId } = render(<Modal id="test" title="Test Modal" content={<p>Test content</p>} isOpen onClose={() => {}} onSubmit={handleSubmit} />);
        const submitButton = getByTestId('modal-submit-button');

        expect(submitButton).toBeTruthy();
        fireEvent.click(submitButton);
        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    test('matches snapshot', () => {
        const { asFragment } = render(<Modal id="test" title="Test Modal" content={<p>Test content</p>} isOpen onClose={() => {}} />);
        expect(asFragment()).toMatchSnapshot();
    });
});