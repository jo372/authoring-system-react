import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render } from '@testing-library/react';
import { configure, mount } from 'enzyme';
import React from 'react';
import Title from './Title';

configure({ adapter: new Adapter() });

describe('Title', () => {
  it('should render correctly', () => {
    const { container } = render(<Title headingText="text" />);
    const title = container.querySelector('.title-wrapper');
    expect(title).toBeInTheDocument();
  });
});
