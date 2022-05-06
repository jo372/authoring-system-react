/* eslint-disable */

import React, { useState } from 'react';
import {
  BiChevronDown,
  BiChevronLeft,
  BiChevronRight,
  BiChevronUp
} from 'react-icons/bi';
import './collapsible-list.scss';

type ListType = 'unordered' | 'ordered';
type ArrowDirection = 'up' | 'down' | 'left' | 'right';

interface CollapisbleMenuProps {
  id?: string,
  className?: string,
  type?: ListType,
  title?: string,
  isOpen?: boolean,
  arrowDirection?: ArrowDirection,
  children?: React.ReactNode,
  innerRef?: React.ForwardedRef<HTMLDivElement>,
}

function CollapsibleList(props: CollapisbleMenuProps) {
  const {
    id,
    className,
    children,
    title,
    type,
    arrowDirection = 'down',
    isOpen,
    innerRef,
  } = props;

  const [isClosed, setIsClosed] = useState(!isOpen);

  const toggleIsClosed = () => {
    setIsClosed(!isClosed);
  };

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = event;
    if (key === 'Enter' || key === ' ') {
      toggleIsClosed();
    }
  };

  const getListType = () => {
    if (type === 'unordered') {
      return <ul>{children}</ul>;
    }
    return <ol>{children}</ol>;
  };

  const getArrowIconForDirection = (direction: ArrowDirection) => {
    switch (direction) {
      case 'up':
        return <BiChevronUp data-icon-type="chevron-up" />;
      case 'down':
        return <BiChevronDown data-icon-type="chevron-down" />;
      case 'left':
        return <BiChevronLeft data-icon-type="chevron-left" />;
      case 'right':
        return <BiChevronRight data-icon-type="chevron-right" />;
    }
  };

  const isClosedCSSSelector = isClosed ? 'closed' : '';
  const arrowDirectionCSSSelector = `arrow-${arrowDirection}`;

  return (
    <div id={id} className={`collapsible__list ${isClosedCSSSelector} ${arrowDirectionCSSSelector} ${className}`.trim()}>
      <div role="button" className="collapsible__list__header" onClick={toggleIsClosed} onKeyDown={onKeyDownHandler} tabIndex={0}>
        <div className="collapsible__list__header__icon-wrapper">
          <span className="collapsible__list__header__icon">
            { getArrowIconForDirection(arrowDirection) }
          </span>
        </div>
        <div className="collapsible__list__header-title">
          <span>{ title }</span>
        </div>
      </div>

      <div ref={innerRef} className="collapsible__list__body">
        { getListType() }
      </div>
    </div>
  );
}

CollapsibleList.defaultProps = {
  id: undefined,
  className: '',
  type: 'unordered',
  title: '',
  isOpen: true,
  arrowDirection: 'down',
  children: [],
};

export default CollapsibleList;
