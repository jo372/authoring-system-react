import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('the document should contain a CollapisbleMenu', () => {
  const { container } = render(<App />);
  expect(container.querySelector('.collapsible-menu')).not.toBeNull();
})