import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App Test', () => {
  it('the document should contain a CollapisbleMenu', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.collapsible-menu')).not.toBeNull();
  });

  it('within the collapsible container, there should be a search box', () => {
    const { container } = render(<App />);
    const collapsibleMenu = container.querySelector('.collapsible-menu') as HTMLDivElement;
    expect(collapsibleMenu.querySelector('.searchbox')).not.toBeNull();
  });
});
