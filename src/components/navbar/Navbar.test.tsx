import { render } from '@testing-library/react';
import React from 'react';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('should render', () => {
    const { container } = render(<Navbar />);
    expect(container).toBeTruthy();
  });
  it('when a child is added to the component, it should be added.', () => {
    const { container } = render(<Navbar><div id="hello">Hello</div></Navbar>);
    expect(container.querySelector('#hello')).toBeTruthy();
  });
  it('when an id is passed in the navbar should contain the property', () => {
    const { container } = render(<Navbar id="hello" />);
    expect(container.querySelector('#hello')).toBeTruthy();
  });
  it('when a className is provided, expect the navbar to contain the css classes', () => {
    const { container } = render(<Navbar className="hello" />);
    expect(container.querySelector('.hello')).toBeTruthy();
  });
});
