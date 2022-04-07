import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Text from './Text';

describe('Text Component', () => {
  it('when heading is provided the default should be a p element', () => {
    const { container } = render(<Text />);
    const heading = container.querySelector('p');

    expect(heading).toBeInTheDocument();
  });
  it('when h1 is provided as a header option it should return a h1 element', () => {
    const { container } = render(<Text heading="h1" />);
    const heading = container.querySelector('h1');

    expect(heading).toBeInTheDocument();
  });
  it('when h2 is provided as a header option it should return a h2 element', () => {
    const { container } = render(<Text heading="h2" />);
    const heading = container.querySelector('h2');

    expect(heading).toBeInTheDocument();
  });
  it('when h3 is provided as a header option it should return a h3 element', () => {
    const { container } = render(<Text heading="h3" />);
    const heading = container.querySelector('h3');

    expect(heading).toBeInTheDocument();
  });
  it('when h4 is provided as a header option it should return a h4 element', () => {
    const { container } = render(<Text heading="h4" />);
    const heading = container.querySelector('h4');

    expect(heading).toBeInTheDocument();
  });
  it('when h5 is provided as a header option it should return a h5 element', () => {
    const { container } = render(<Text heading="h5" />);
    const heading = container.querySelector('h5');

    expect(heading).toBeInTheDocument();
  });
  it('when h6 is provided as a header option it should return a h6 element', () => {
    const { container } = render(<Text heading="h6" />);
    const heading = container.querySelector('h6');

    expect(heading).toBeInTheDocument();
  });
  it('when text is provided as a child, it should render with the text', () => {
    const { container } = render(<Text>Hello</Text>);
    const heading = container.querySelector('p');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(Text.defaultProps.text);
  });
  it('when the element is clicked it should become contentEditable', () => {
    const { container } = render(<Text />);
    const heading = container.querySelector('p') as HTMLParagraphElement;
    heading.click();

    expect(heading).toHaveAttribute('contentEditable', 'true');
  });
  it('when the element is clicked and the user writes text it should append it to the text element after pressing enter to accept', () => {
    const { container } = render(<Text />);
    const heading = container.querySelector('p') as HTMLParagraphElement;

    heading.click();
    fireEvent.change(heading, {
      target: { innerHTML: 'Hello' },
    });
    fireEvent.keyPress(heading, { key: 'Enter', charCode: 13 });
    expect(heading).toHaveTextContent('Hello');
  });
});
