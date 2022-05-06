import { render } from '@testing-library/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';
import React from 'react';
import CollapsibleList from './CollapsibleList';

configure({ adapter: new Adapter() });

describe('CollapsibleList Component', () => {
  it('when CollapsibleList type is ordered it should return an ol', () => {
    const { container } = render(
      <CollapsibleList
        title="Test Title"
        isOpen={false}
        arrowDirection="down"
        type="ordered"
      >
        <li>Test Item 1</li>
        <li>Test Item 2</li>
        <li>Test Item 3</li>
      </CollapsibleList>,
    );

    expect(container.querySelector('ol')).toBeTruthy();
  });

  it('when CollapisbleList arrowDirection is up it should contain BiChevronUp', () => {
    const { container } = render(
      <CollapsibleList
        title="Test Title"
        isOpen={false}
        arrowDirection="up"
      >
        <li>Test Item 1</li>
        <li>Test Item 2</li>
        <li>Test Item 3</li>
      </CollapsibleList>,
    );

    expect(container.querySelector('svg[data-icon-type="chevron-up"]')).toBeTruthy();
  });

  it('when CollapisbleList arrowDirection is down it should contain BiChevronDown', () => {
    const { container } = render(
      <CollapsibleList
        title="Test Title"
        isOpen={false}
        arrowDirection="down"
      >
        <li>Test Item 1</li>
        <li>Test Item 2</li>
        <li>Test Item 3</li>
      </CollapsibleList>,
    );

    expect(container.querySelector('svg[data-icon-type="chevron-down"]')).toBeTruthy();
  });

  it('by default CollapisbleList arrowDirection is down', () => {
    const { container } = render(
      <CollapsibleList>
        <li>Test Item 1</li>
        <li>Test Item 2</li>
        <li>Test Item 3</li>
      </CollapsibleList>,
    );

    expect(container.querySelector('svg[data-icon-type="chevron-down"]')).toBeTruthy();
  });

  it('when CollapisbleList arrowDirection is left it should contain BiChevronLeft', () => {
    const { container } = render(
      <CollapsibleList
        title="Test Title"
        isOpen={false}
        arrowDirection="left"
      >
        <li>Test Item 1</li>
        <li>Test Item 2</li>
        <li>Test Item 3</li>
      </CollapsibleList>,
    );

    expect(container.querySelector('svg[data-icon-type="chevron-left"]')).toBeTruthy();
  });

  it('when CollapisbleList arrowDirection is right it should contain BiChevronRight', () => {
    const { container } = render(
      <CollapsibleList
        title="Test Title"
        isOpen={false}
        arrowDirection="right"
      >
        <li>Test Item 1</li>
        <li>Test Item 2</li>
        <li>Test Item 3</li>
      </CollapsibleList>,
    );

    expect(container.querySelector('svg[data-icon-type="chevron-right"]')).toBeTruthy();
  });
});
