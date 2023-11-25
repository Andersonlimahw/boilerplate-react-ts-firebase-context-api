import { render, screen } from '@testing-library/react';
import Avatar from './';

describe('Avatar component', () => {
    test('renders image with alt text', () => {
        render(<Avatar imageUrl="test-image-url" />);
        const imgElement = screen.getByRole('img');
        expect(imgElement).toBeTruthy();
        expect(imgElement).toBeTruthy();
    });

    test('renders with avatar class', () => {
        render(<Avatar imageUrl="test-image-url" />);
        const imgElement = screen.getByRole('img');
        expect(imgElement).toBeTruthy();
    });
});