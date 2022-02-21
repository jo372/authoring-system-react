import React, { HTMLAttributes } from 'react';
import './navbar.scss';

type CherryPickedPropTypes = 'id' | 'children' | 'className';

interface NavbarProps extends Pick<HTMLAttributes<HTMLElement>, CherryPickedPropTypes> {}

function Navbar(props: NavbarProps) {
  const {
    id,
    className,
    children,
  } = props;

  return (
    <nav id={id} className={className}>
      <div className="navbar__wrapper">
        { children }
      </div>
    </nav>
  );
}

export default Navbar;
