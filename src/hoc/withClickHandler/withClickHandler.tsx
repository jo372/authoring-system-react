import * as React from 'react';

export interface WithClickHandlerProps {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function WithClickHandler<T extends WithClickHandlerProps>(
  WrappedComponent : React.ComponentType<T>,
) {
  return function (props: T) {
    const {
      onClick,
      ...rest
    } = props;

    const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
      if (onClick) {
        onClick(e);
      }

      const currentTarget = e.currentTarget as HTMLElement;
      currentTarget.style.border = '2px solid pink';
    };

    return (
      <WrappedComponent
        onClick={onClickHandler}
        {...rest as T}
      />
    );
  };
}
