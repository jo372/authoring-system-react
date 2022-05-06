import { render } from '@testing-library/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';
import React from 'react';
import useOutsideAlerter from './useOutsideAlerter';

configure({ adapter: new Adapter() });

interface MockAppProps {
  innerRef?: React.RefObject<HTMLDivElement>;
}
function MockApp(props: MockAppProps) {
  const {
    innerRef,
  } = props;

  return (
    <div ref={innerRef} className="mock-app">
      <p>Hello</p>
    </div>
  );
}

interface MockWithHocProps {
  onLeaveHandler?: () => void;
}

function MockWithHoc(props: MockWithHocProps) {
  const { onLeaveHandler = () => {} } = props;
  const ref : React.RefObject<HTMLDivElement> = React.createRef();

  useOutsideAlerter(ref, onLeaveHandler);

  return (
    <MockApp innerRef={ref} />
  );
}

describe('useOutsideAlerter HOC', () => {
  it('should render the component', () => {
    const { container } = render(<MockWithHoc />);
    const mockApp = container.querySelector('.mock-app');

    expect(mockApp).toBeInTheDocument();
  });
});
