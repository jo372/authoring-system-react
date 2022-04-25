import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Modal from './Modal';

describe('Modal', () => {
  it('by default the modal should be set to hidden', () => {
    const { container } = render(<Modal />);
    expect(container.querySelector('.modal')).toHaveClass('hidden');
  });
  it('by default the title should be Warning!', () => {
    const { getByText } = render(<Modal />);
    expect(getByText('Warning!')).toBeInTheDocument();
  });
  it('by default the accept button should be Okay', () => {
    const { getByText } = render(<Modal />);
    expect(getByText('Okay')).toBeInTheDocument();
  });
  it('by default the deny button should be Close', () => {
    const { getByText } = render(<Modal />);
    expect(getByText('Close')).toBeInTheDocument();
  });
  it('when the modal__footer-button primary is pressed it should called onAccept if provided', () => {
    const onAccept = jest.fn();
    const { getByText } = render(<Modal onAccept={onAccept} />);
    fireEvent.click(getByText('Okay'));
    expect(onAccept).toHaveBeenCalled();
  });
  it('when the modal__footer-button secondary is pressed it should call onDeny if provided', () => {
    const onDeny = jest.fn();
    const { getByText } = render(<Modal onDeny={onDeny} />);
    fireEvent.click(getByText('Close'));
    expect(onDeny).toHaveBeenCalled();
  });
  it('when isHidden is provided the modal should contain the hidden css selector', () => {
    const { container } = render(<Modal isHidden />);
    expect(container.querySelector('.modal')).toHaveClass('hidden');
  });
  it('when the overlay is clicked it should call the onDeny method if provided', () => {
    const onDeny = jest.fn();
    const { container } = render(<Modal onDeny={onDeny} />);
    fireEvent.click(container.querySelector('.modal__overlay') as HTMLDivElement);
    expect(onDeny).toHaveBeenCalled();
  });
  it('when the modal__overlay is selected via keyboard and enter is pressed it should call onDeny', () => {
    const onDeny = jest.fn();
    const { container } = render(<Modal onDeny={onDeny} />);
    fireEvent.keyDown(container.querySelector('.modal__overlay') as HTMLDivElement, { key: 'Enter' });
    expect(onDeny).toHaveBeenCalled();
  });
  it('when a title is provided it should exist within the document', () => {
    const { getByText } = render(<Modal title="Test" />);
    expect(getByText('Test')).toBeInTheDocument();
  });
  it('when DenyText is provided it should exist on the modal__footer-button secondary button innerText', () => {
    const { getByText } = render(<Modal denyText="Test" />);
    expect(getByText('Test')).toBeInTheDocument();
  });
  it('when the modal isnt hidden it shouldnt contain the hidden css selector', () => {
    const { container } = render(<Modal isHidden={false} />);
    expect(container.querySelector('.modal')).not.toHaveClass('hidden');
  });
});
