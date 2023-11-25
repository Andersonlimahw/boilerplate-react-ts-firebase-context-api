import React from 'react';
import { render } from '@testing-library/react';
import Badge from './';

describe('Badge', () => {
    test('renders with default variant', () => {
        const { getByText, asFragment } = render(<Badge variant="default">Default</Badge>);
        const badge = getByText(/Default/i);
        expect(badge).toBeTruthy();
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders with warning variant', () => {
        const { getByText, asFragment } = render(<Badge variant="warning">Warning</Badge>);
        const badge = getByText(/Warning/i);
        expect(badge).toBeTruthy();
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders with danger variant', () => {
        const { getByText, asFragment } = render(<Badge variant="danger">Danger</Badge>);
        const badge = getByText(/Danger/i);
        expect(badge).toBeTruthy();
        expect(asFragment()).toMatchSnapshot();
    });
});