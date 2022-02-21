import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Test', () => {
  it('the document should contain a CollapisbleMenu', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.collapsible__menu')).not.toBeNull();
  });

  it('within the collapsible container, there should be a search box', () => {
    const { container } = render(<App />);
    const collapsibleMenu = container.querySelector('.collapsible__menu') as HTMLDivElement;
    expect(collapsibleMenu.querySelector('.searchbox')).not.toBeNull();
  });
  it('if there is device__preview-button with .active, it should remove it when another button is pressed', () => {
    const { container } = render(<App />);
    const currentPreviewDevice = container.querySelector('.device__preview-button.active') as HTMLDivElement;
    const anotherPreviewDeviceButton = container.querySelector('.device__preview-button:not(.active)') as HTMLDivElement;

    expect(currentPreviewDevice.classList.contains('active')).toBe(true);
    fireEvent.click(anotherPreviewDeviceButton);
    expect(currentPreviewDevice.classList.contains('active')).toBe(false);
  });
});
