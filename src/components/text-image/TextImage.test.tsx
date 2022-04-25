import { render } from '@testing-library/react';
import React from 'react';
import TextImage from './TextImage';

describe('TextImage Component', () => {
  it('when the title property is provided, it should render the title', () => {
    const { getByText } = render(<TextImage title="Title" />);
    const title = getByText('Title');

    expect(title).toBeInTheDocument();
  });
  it('when the heading property is provided, it should render the heading', () => {
    const { getByText } = render(<TextImage heading="Heading" />);
    const heading = getByText('Heading');

    expect(heading).toBeInTheDocument();
  });
  it('when the paragraph property is provided, it should render the text', () => {
    const { getByText } = render(<TextImage paragraph="Text" />);
    const text = getByText('Text');

    expect(text).toBeInTheDocument();
  });
  it('when the src is provided, it should render the image', () => {
    const { getByAltText } = render(<TextImage src="https://via.placeholder.com/150" alt="Image" />);
    const image = getByAltText('Image');

    expect(image).toBeInTheDocument();
  });
  it('when className is provided it should render the className', () => {
    const { container } = render(<TextImage className="test" />);
    const textImage = container.querySelector('.test');

    expect(textImage).toBeInTheDocument();
  });
});
