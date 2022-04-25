import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import WithClickHandler, { WithClickHandlerProps } from './withClickHandler';

function MockApp(props: WithClickHandlerProps) {
  const { onClick } = props;

  const onKeyDown = () => {};
  return (
    <div role="button" onKeyDown={onKeyDown} onClick={onClick} tabIndex={0}>MockApp</div>
  );
}

const MockWithHoc = WithClickHandler(MockApp);

describe('WithClickHandler HOC', () => {
  it('should render the wrapped component', () => {
    const { container, getByText } = render(<MockWithHoc />);
    const heading = container.querySelector('div');

    expect(heading).toBeInTheDocument();
    expect(getByText('MockApp')).toBeInTheDocument();
  });
  it('when the wrapped component is clicked, the onClick prop should be called', () => {
    const onClick = jest.fn();
    const { container } = render(<MockWithHoc onClick={onClick} />);
    const heading = container.querySelector('div') as HTMLDivElement;

    fireEvent.click(heading);

    expect(onClick).toHaveBeenCalled();
  });
  it('when an onClick prop isnt provided, the wrapped component shouldnt call the onClick prop method provided', () => {
    const onClick = jest.fn();
    const { container } = render(<MockWithHoc />);
    const heading = container.querySelector('div') as HTMLDivElement;

    fireEvent.click(heading);

    expect(onClick).not.toHaveBeenCalled();
  });
  it('by default when the item is clicked it should set the component to have a 2px solid pink border', () => {
    const { container } = render(<MockWithHoc />);
    const heading = container.querySelector('div') as HTMLDivElement;

    fireEvent.click(heading);

    expect(heading.style.border).toBe('2px solid pink');
  });
});
