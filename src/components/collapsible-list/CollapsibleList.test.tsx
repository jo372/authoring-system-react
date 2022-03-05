import React, { useEffect } from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { wait } from '@testing-library/user-event/dist/utils';
import CollapsibleList from './CollapsibleList';

describe('CollapsibleList Component', () => {
  // 37,41-45,50,57,61-63
  it('when space or enter key on collapsible__list__header the collapsible list should toggle the closed css selector', async () => {
    const { container } = render(
      <CollapsibleList
        id="collapsible-list"
        title="Collapsible List"
        isOpen
        arrowDirection="down"
      >
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </CollapsibleList>,
    );

    const collapsibleList = container.querySelector('#collapsible-list') as HTMLDivElement;
    const collapisbleHeader = container.querySelector('.collapsible__list__header') as HTMLDivElement;

    expect(collapsibleList).toBeInTheDocument();
    expect(collapisbleHeader).toBeInTheDocument();
    expect(collapisbleHeader.classList.contains('closed')).toBe(false);

    fireEvent.keyDown(collapisbleHeader, { key: 'Enter', charCode: 13 });

    expect(collapsibleList.classList.contains('closed')).toBe(true);

    fireEvent.keyDown(collapisbleHeader, { key: ' ', charCode: 32 });
    expect(collapsibleList.classList.contains('closed')).toBe(false);
  });

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
