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
    const collapsible_menu = container.querySelector('.collapsible-menu') as HTMLDivElement;
    expect(collapsible_menu.querySelector('.searchbox')).not.toBeNull();
  })
  
  it('when enter is pressed in the searchbox, it should console log the value.', () => {
  
  })
})
