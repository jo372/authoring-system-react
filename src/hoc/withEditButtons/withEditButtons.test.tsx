import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import React from 'react';
import { WithEditButtons, WithEditButtonsProps } from './withEditButtons';

configure({ adapter: new Adapter() });

function MockApp(props: WithEditButtonsProps) {
  const {
    onComponentClick,
    children,
  } = props;

  return (
    <div className="mock-app" onClick={onComponentClick} onKeyDown={() => {}}>
      { children }
    </div>
  );
}

const MockWithHoc = WithEditButtons(MockApp);

describe('WithEditButtons HOC', () => {
  it('should render the component', () => {
    const wrapper = mount(
      <MockWithHoc />,
    );
    expect(wrapper.find('.mock-app').length).toBe(1);
  });
});
