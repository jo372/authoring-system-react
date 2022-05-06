import { fireEvent, render } from '@testing-library/react';
import React from 'react';
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
});
