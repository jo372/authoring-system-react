import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CollapsibleMenu from './CollapsibleMenu';

test('the menu should be closed when the property closedByDefault is provided', () => {
  const testId = 'collapsible-menu';
  const result = render(<CollapsibleMenu id={testId} closedByDefault />);
  const { container } = result;
  expect(container.querySelector(`#${testId}`)).toHaveClass('closed');
});

test('the menu by default should not be closed', () => {
  const testId = 'collapsible-menu';
  const result = render(<CollapsibleMenu id={testId} />);
  const { container } = result;
  expect(container.querySelector(`#${testId}`)).not.toHaveClass('closed');
});

test('when the position right is provided, it should contain the css selector right', () => {
  const testId = 'collapsible-menu';
  const result = render(<CollapsibleMenu id={testId} position="right" />);
  const { container } = result;
  expect(container.querySelector(`#${testId}`)).toHaveClass('right');
});

test('the collapsible container should be on the left by default', () => {
  const testId = 'collapsible-menu';
  const result = render(<CollapsibleMenu id={testId} />);
  const { container } = result;
  expect(container.querySelector(`#${testId}`)).toHaveClass('left');
});

test('when no id is provided, the element should not contain the id property', () => {
  const result = render(<CollapsibleMenu />);
  const { container } = result;
  expect(container.querySelector('#collapsible-menu')).toBeNull();
});

test('if closedByDefault is false, the collapsible menu should not contain the closed css selector', () => {
  const testId = 'collapsible-menu';
  const result = render(<CollapsibleMenu id={testId} closedByDefault={false} />);
  const { container } = result;
  expect(container.querySelector(`#${testId}`)).not.toHaveClass('closed');
});

test('when children are provided, the collapsible menu should contain them', () => {
  const testId = 'collapsible-menu';
  const result = render(
    <CollapsibleMenu id={testId}>
      <div>Hello</div>
    </CollapsibleMenu>,
  );
  const { container } = result;
  expect(container.querySelector(`#${testId} .collapsible-menu__content`)).toContainHTML('Hello');
});

test('when the position right is provided, the collapsible menu should contain the right css selector', () => {
  const testId = 'collapsible-menu';
  const result = render(<CollapsibleMenu id={testId} position="right" />);
  const { container } = result;
  expect(container.querySelector(`#${testId}`)).toHaveClass('right');
});

test('when the position left is provided, the collapsible menu should contain the left css selector', () => {
  const testId = 'collapsible-menu';
  const result = render(<CollapsibleMenu id={testId} position="left" />);
  const { container } = result;
  expect(container.querySelector(`#${testId}`)).toHaveClass('left');
});

test('when the .collapsible-menu__close-tab is focused and enter is presed it should apply the css selector closed', () => {
  const testId = 'collapsible-menu';
  const result = render(<CollapsibleMenu id={testId} />);
  const { container } = result;
  const closeTab = container.querySelector('.collapsible-menu__close-tab') as HTMLDivElement;
  closeTab?.focus();
  fireEvent.keyDown(closeTab, { key: 'Enter' });
  expect(container.querySelector(`#${testId}`)).toHaveClass('closed');
});
