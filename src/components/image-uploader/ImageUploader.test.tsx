import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import ImageUploader from './ImageUploader';

if (typeof window.URL.createObjectURL === 'undefined') {
  window.URL.createObjectURL = jest.fn();
}

describe('Image Uploader Component', () => {
  it('when an image has been selected, the onImageChange handler should be called', () => {
    const onImageChange = jest.fn();
    const { container } = render(<ImageUploader onImageChange={onImageChange} />);
    const imageInput = container.querySelector('input[type="file"]') as HTMLInputElement;

    fireEvent.change(
      imageInput,
      {
        target: {
          files: [
            new File([], 'test.png', { type: 'image/png' }),
          ],
        },
      },
    );

    expect(onImageChange).toHaveBeenCalled();
  });
  it('if the resetContents prop is true, then it should set the imageInput value to blank and the src state to null', () => {
    const onImageChange = jest.fn();
    const { container, rerender } = render(<ImageUploader onImageChange={onImageChange} />);
    const imageInput = container.querySelector('input[type="file"]') as HTMLInputElement;

    fireEvent.change(
      imageInput,
      {
        target: {
          files: [
            new File([], 'test.png', { type: 'image/png' }),
          ],
        },
      },
    );

    rerender(<ImageUploader onImageChange={onImageChange} resetContents />);

    const newImageInput = container.querySelector('input[type="file"]') as HTMLInputElement;

    expect(newImageInput.value).toBe('');
  });
});
