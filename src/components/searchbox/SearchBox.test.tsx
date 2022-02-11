import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBox from './SearchBox';

describe('SearchBox', () => {
  it('when searchBox is provided with an onSearch function, it should be called when button is pressed', () => {
    const onSearch = jest.fn();
    const { container } = render(<SearchBox onSearch={onSearch} />);
    const input = container.querySelector('input') as HTMLInputElement;
    const button = container.querySelector('button') as HTMLButtonElement;

    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledWith('Hello');
  });

  it('when a SearchBox function is not provided it should not call the function', () => {
    const onSearch = jest.fn();
    const { container } = render(<SearchBox />);
    const input = container.querySelector('input') as HTMLInputElement;
    const button = container.querySelector('button') as HTMLButtonElement;

    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(button);
    expect(onSearch).not.toHaveBeenCalled();
  });

  test('after enter has been pressed the searchbox value should be set to blank', () => {
    const onSearch = jest.fn();
    const { container } = render(<SearchBox onSearch={onSearch} />);
    const input = container.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    expect(input.value).toBe('');
  });
});
