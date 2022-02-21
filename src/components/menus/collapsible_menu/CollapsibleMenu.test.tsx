import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CollapsibleMenu from './CollapsibleMenu';

describe('Collapsible Menu Component', () => {
  it('the menu should be closed when the property closedByDefault is provided', () => {
    const testId = 'collapsible__menu';
    const result = render(<CollapsibleMenu id={testId} closedByDefault />);
    const { container } = result;
    expect(container.querySelector(`#${testId}`)).toHaveClass('closed');
  });

  it('the menu by default should not be closed', () => {
    const testId = 'collapsible__menu';
    const result = render(<CollapsibleMenu id={testId} />);
    const { container } = result;
    expect(container.querySelector(`#${testId}`)).not.toHaveClass('closed');
  });

  it('when the position right is provided, it should contain the css selector right', () => {
    const testId = 'collapsible__menu';
    const result = render(<CollapsibleMenu id={testId} position="right" />);
    const { container } = result;
    expect(container.querySelector(`#${testId}`)).toHaveClass('right');
  });

  it('the collapsible container should be on the left by default', () => {
    const testId = 'collapsible__menu';
    const result = render(<CollapsibleMenu id={testId} />);
    const { container } = result;
    expect(container.querySelector(`#${testId}`)).toHaveClass('left');
  });

  it('when no id is provided, the element should not contain the id property', () => {
    const result = render(<CollapsibleMenu />);
    const { container } = result;
    expect(container.querySelector('#collapsible__menu')).toBeNull();
  });

  it('if closedByDefault is false, the collapsible menu should not contain the closed css selector', () => {
    const testId = 'collapsible__menu';
    const result = render(<CollapsibleMenu id={testId} closedByDefault={false} />);
    const { container } = result;
    expect(container.querySelector(`#${testId}`)).not.toHaveClass('closed');
  });

  it('when children are provided, the collapsible menu should contain them', () => {
    const testId = 'collapsible__menu';
    const result = render(
      <CollapsibleMenu id={testId}>
        <div>Hello</div>
      </CollapsibleMenu>,
    );
    const { container } = result;
    expect(container.querySelector(`#${testId} .collapsible__menu__content`)).toContainHTML('Hello');
  });

  it('when the position right is provided, the collapsible menu should contain the right css selector', () => {
    const testId = 'collapsible__menu';
    const result = render(<CollapsibleMenu id={testId} position="right" />);
    const { container } = result;
    expect(container.querySelector(`#${testId}`)).toHaveClass('right');
  });

  it('when the position left is provided, the collapsible menu should contain the left css selector', () => {
    const testId = 'collapsible__menu';
    const result = render(<CollapsibleMenu id={testId} position="left" />);
    const { container } = result;
    expect(container.querySelector(`#${testId}`)).toHaveClass('left');
  });

  it('when the .collapsible__menu__close-tab is focused and enter is presed it should apply the css selector closed', () => {
    const testId = 'collapsible__menu';
    const result = render(<CollapsibleMenu id={testId} />);
    const { container } = result;
    const closeTab = container.querySelector('.collapsible__menu__close-tab') as HTMLDivElement;
    closeTab?.focus();
    fireEvent.keyDown(closeTab, { key: 'Enter' });
    expect(container.querySelector(`#${testId}`)).toHaveClass('closed');
  });
  it('when the .collapsible__menu__close-tab is focused and space is presed it should apply the css selector closed', () => {
    const testId = 'collapsible__menu';
    const result = render(<CollapsibleMenu id={testId} />);
    const { container } = result;
    const closeTab = container.querySelector('.collapsible__menu__close-tab') as HTMLDivElement;
    closeTab?.focus();
    fireEvent.keyDown(closeTab, { key: ' ' });
    expect(container.querySelector(`#${testId}`)).toHaveClass('closed');
  });
});
