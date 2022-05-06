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
  it('when a maxWidth is provided, it should render the maxWidth', () => {
    const { container } = render(
      <PreviewWindow maxWidth="100px">
        <p>Hello</p>
      </PreviewWindow>,
    );

    const previewWindow = container.querySelector('.preview-window') as HTMLDivElement;

    expect(previewWindow).toHaveStyle('max-width: 100px');
  });
  it('when an id is provided, it should render the id', () => {
    const { container } = render(
      <PreviewWindow id="test">
        <p>Hello</p>
      </PreviewWindow>,
    );

    const previewWindow = container.querySelector('.preview-window') as HTMLDivElement;

    expect(previewWindow).toHaveAttribute('id', 'test');
  });
});
