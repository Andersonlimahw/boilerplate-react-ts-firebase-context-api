import React from 'react';

import { render } from '@testing-library/react';
import { Title } from './';

describe('Title Component', () => {
  it('renders a title with a subtitle', () => {
    const { getByText, asFragment } = render(<Title title="Main Title" subTitle="Subtitle" />);
    expect(getByText('Main Title')).toBeTruthy();

    expect(getByText('Subtitle')).toBeTruthy();

    expect(asFragment()).toMatchSnapshot();
  });
});
