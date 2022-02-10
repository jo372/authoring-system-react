import React from 'react';
import {
  BiChevronRight,
  BiChevronLeft,
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

  const [isClosed, setIsClosed] = React.useState(closedByDefault ?? false);

  const tabInset = position === 'left' ? <BiChevronRight /> : <BiChevronLeft />;
  const className = `collapsible-menu${position ? ` ${position}` : ''}${isClosed ? ' closed' : ''}`;

  const toggleIsClosed = () => {
    setIsClosed(!isClosed);
  };

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = event;
    if (key === 'Enter') {
      toggleIsClosed();
    }
  };

  return (
    <div id={id} className={className}>
      <div role="button" className="collapsible-menu__close-tab" onClick={toggleIsClosed} onKeyDown={onKeyDownHandler} tabIndex={0}>
        <div className="collapsible-menu__close-tab__icon">
          {tabInset}
        </div>
      </div>
      <div className="collapsible-menu__content">
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
