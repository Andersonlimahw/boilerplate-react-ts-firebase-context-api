import { render } from '@testing-library/react';
import { UserName } from './';

describe('UserName Component', () => {
 test('renders UserName component correctly with loading prop set to true', () => {
    const { asFragment } = render(<UserName name="John Doe" loading={true} />);
    expect(asFragment()).toMatchSnapshot();
 });

 test('renders UserName component correctly with loading prop set to false', () => {
    const { asFragment } = render(<UserName name="John Doe" loading={false} />);
    expect(asFragment()).toMatchSnapshot();
 });

 test('renders UserName component with name when loading prop is false', () => {
    const { getByText } = render(<UserName name="John Doe" loading={false} />);
    expect(getByText('John Doe')).toBeTruthy();
 });
});