import { render } from '@testing-library/react';
import React from 'react';
import PreviewWindow from './PreviewWindow';

describe('PreviewWindow Component', () => {
  it('should render the preview window', () => {
    const { container } = render(<PreviewWindow />);
    const previewWindow = container.querySelector('.preview-window');

    expect(previewWindow).toBeInTheDocument();
  });
  it('when no className is provided it should render the default className', () => {
    const { container } = render(<PreviewWindow />);
    const previewWindow = container.querySelector('.preview-window') as HTMLDivElement;

    expect(previewWindow).toHaveClass('preview-window');
  });
  it('when children are provided via props, it should render the children', () => {
    const { container } = render(
      <PreviewWindow>
        <p>Hello</p>
      </PreviewWindow>,
    );

    const paragraph = container.querySelector('p');

    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent('Hello');
  });
});
