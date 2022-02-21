import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DevicePreviewButton from './DevicePreviewButton';

describe('Device Preview Button Component', () => {
  it('when button is clicked, it should call the onClick function', () => {
    const onClick = jest.fn();
    const { container } = render(<DevicePreviewButton onClick={onClick} />);
    const button = container.querySelector('button') as HTMLButtonElement;

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
  it('when isActive is provided, the button should contain the .active css selector', () => {
    const { container } = render(<DevicePreviewButton isActive />);
    const button = container.querySelector('button') as HTMLButtonElement;

    expect(button.classList.contains('active')).toBe(true);
  });
  it('the button should contain an svg as a child element', () => {
    const { container } = render(<DevicePreviewButton />);
    const button = container.querySelector('button') as HTMLButtonElement;

    expect(button.querySelector('svg')).not.toBeNull();
  });
  it('when no properties are provided, it should be data-type desktop by default', () => {
    const { container } = render(<DevicePreviewButton />);
    const button = container.querySelector('button') as HTMLButtonElement;

    expect(button.getAttribute('data-type')).toBe('desktop');
  });
  it('isActive should be false by default', () => {
    const { container } = render(<DevicePreviewButton />);
    const button = container.querySelector('button') as HTMLButtonElement;

    expect(button.classList.contains('active')).toBe(false);
  });
  it('when deviceType is desktop, it should be data-type desktop', () => {
    const { container } = render(<DevicePreviewButton deviceType="desktop" />);
    const button = container.querySelector('button') as HTMLButtonElement;

    expect(button.getAttribute('data-type')).toBe('desktop');
  });
  it('when deviceType is tablet, it should be data-type tablet', () => {
    const { container } = render(<DevicePreviewButton deviceType="tablet" />);
    const button = container.querySelector('button') as HTMLButtonElement;

    expect(button.getAttribute('data-type')).toBe('tablet');
  });
  it('when deviceType is mobile, it should be data-type mobile', () => {
    const { container } = render(<DevicePreviewButton deviceType="mobile" />);
    const button = container.querySelector('button') as HTMLButtonElement;

    expect(button.getAttribute('data-type')).toBe('mobile');
  });
});
