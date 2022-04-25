import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Image from './Image';

describe('Image Component', () => {
  it('when src is not provided, the attribute should not be set', () => {
    const { container } = render(<Image />);
    const image = container.querySelector('img') as HTMLImageElement;
    expect(image.getAttribute('src')).toBeNull();
  });
  it('when src is provided, it should render an image', () => {
    const { container } = render(<Image src="https://via.placeholder.com/150" />);
    expect(container.querySelector('img')).not.toBeNull();
  });
  it('when an alt is provided, it should render an image with an alt', () => {
    const { container } = render(<Image src="https://via.placeholder.com/150" alt="test" />);
    const image = container.querySelector('img') as HTMLImageElement;
    expect(image.getAttribute('alt')).toBe('test');
  });
  it('when an onClick is provided, it should render an image with an onClick', () => {
    const onClick = jest.fn();
    const { container } = render(<Image src="https://via.placeholder.com/150" onClick={onClick} />);
    const image = container.querySelector('img') as HTMLImageElement;
    fireEvent.click(image);
    expect(onClick).toHaveBeenCalled();
  });
  it('when a className is provided, it should render an image with a className', () => {
    const { container } = render(<Image src="https://via.placeholder.com/150" className="test" />);
    const image = container.querySelector('img') as HTMLImageElement;
    expect(image.getAttribute('class')).toBe('test');
  });
  it('when a ref is provided, it should render an image with a ref', () => {
    const ref = React.createRef<HTMLImageElement>();
    render(<Image src="https://via.placeholder.com/150" innerRef={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
