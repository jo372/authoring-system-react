import React, { useEffect } from 'react';
import {
  BiChevronLeft, BiChevronRight,
} from 'react-icons/bi';
import './collapsiblemenu.scss';

type CollapisbleMenuPosition = 'left' | 'right';

interface CollapsibleMenuProps {
  id?: string;
  closedByDefault?: boolean,
  position?: CollapisbleMenuPosition,
  children?: React.ReactNode
}

function CollapisbleMenu(props: CollapsibleMenuProps) {
  const {
    id, closedByDefault, position, children,
  } = props;

  const [isClosed, setIsClosed] = React.useState(closedByDefault);

  const tabInset = position === 'left' ? <BiChevronRight /> : <BiChevronLeft />;
  const className = `collapsible__menu${position ? ` ${position}` : ''}${isClosed ? ' closed' : ''}`;

  const ref = React.createRef<HTMLDivElement>();

  useEffect(() => {
    if (ref.current) {
      ref.current.click();
    }
  }, [closedByDefault]);
  const toggleIsClosed = () => {
    setIsClosed(!isClosed);
  };

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = event;
    if (key === 'Enter' || key === ' ') {
      toggleIsClosed();
    }
  };

  return (
    <div id={id} className={className}>
      <div ref={ref} role="button" className="collapsible__menu__close-tab" onClick={toggleIsClosed} onKeyDown={onKeyDownHandler} tabIndex={0}>
        <div className="collapsible__menu__close-tab__icon">
          {tabInset}
        </div>
      </div>
      <div className="collapsible__menu__content">
        {children}
      </div>
    </div>
  );
}

CollapisbleMenu.defaultProps = {
  id: undefined,
  closedByDefault: false,
  position: 'left',
  children: null,
};

export default CollapisbleMenu;
