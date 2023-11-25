import React from 'react';
import { render } from '@testing-library/react';
import { SkeletonItem } from './';


describe('SkeletonItem Component', () => {
  it('renders a single skeleton item with default values', () => {
    const { container } = render(<SkeletonItem />);
    const skeletonItem = container.querySelector('.react-loading-skeleton');

    expect(skeletonItem).toMatchSnapshot();
  });


  it('renders a single skeleton item with custom values', () => {
    const { container } = render(<SkeletonItem count={3} baseColor="#fff" height="20px" />);
    const skeletonItem = container.querySelector('.react-loading-skeleton');

    expect(skeletonItem).toMatchSnapshot();
  });

  it('renders a single skeleton item with custom values, variant circle', () => {
    const { container } = render(<SkeletonItem count={3} baseColor="#fff" height="20px" variant='circle' />);
    const skeletonItem = container.querySelector('.react-loading-skeleton');

    expect(skeletonItem).toMatchSnapshot();
  });
});
