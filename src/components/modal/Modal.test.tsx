import { render, fireEvent } from '@testing-library/react';
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
  it('when modal__overlay has been clicked, it should close the modal and not have', () => {
    const { container } = render(<Modal isHidden={false} />);
    fireEvent.click(container.querySelector('.modal__overlay') as HTMLDivElement);
    expect(container.querySelector('.modal')).toHaveClass('hidden');
  });
  it('when modal__overlay has been selected by keyboard and space is pressed it should close', () => {
    const { container } = render(<Modal isHidden={false} />);
    fireEvent.keyDown(container.querySelector('.modal__overlay') as HTMLDivElement, { key: ' ' });
    expect(container.querySelector('.modal')).toHaveClass('hidden');
  });
  it('when modal__overlay is selected by the keyboard and enter is pressed it should close', () => {
    const { container } = render(<Modal isHidden={false} />);
    fireEvent.keyDown(container.querySelector('.modal__overlay') as HTMLDivElement, { key: 'Enter' });
    expect(container.querySelector('.modal')).toHaveClass('hidden');
  });
  it('when a onAccept function is provided it should hide the modal and call the onAccept method', () => {
    const onAccept = jest.fn();
    const { container } = render(<Modal isHidden={false} onAccept={onAccept} />);
    fireEvent.click(container.querySelector('.modal__footer-button.primary') as HTMLButtonElement);
    expect(onAccept).toHaveBeenCalled();
  });
  it('when a onAccept function isnt provided and modal__footer-button primary is pressed, it should hide the modal', () => {
    const { container } = render(<Modal isHidden={false} />);
    fireEvent.click(container.querySelector('.modal__footer-button.primary') as HTMLButtonElement);
    expect(container.querySelector('.modal')).toHaveClass('hidden');
  });
  it('when a onDeny funtion is not provided and modal__footer secondary is pressed, it should hide the modal by default', () => {
    const { container } = render(<Modal isHidden={false} />);
    fireEvent.click(container.querySelector('.modal__footer-button.secondary') as HTMLButtonElement);
    expect(container.querySelector('.modal')).toHaveClass('hidden');
  });
  it('when onDeny function is provide and modal__footer-button secondary is clicked it should call the onDeny function', () => {
    const onDeny = jest.fn();
    const { container } = render(<Modal isHidden={false} onDeny={onDeny} />);
    fireEvent.click(container.querySelector('.modal__footer-button.secondary') as HTMLButtonElement);
    expect(onDeny).toHaveBeenCalled();
  });
});
