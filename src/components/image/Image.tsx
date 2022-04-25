import * as React from 'react';

export interface ImageProps {
  src?: string;
  alt?: string;
  onClick?: () => void;
  className?: string | undefined;
  innerRef?: React.Ref<HTMLImageElement>;
}

export default function Image(props: ImageProps) {
  const {
    src,
    alt,
    className,
    onClick,
    innerRef,
  } = props;

  return React.createElement(
    'img',
    {
      src,
      alt,
      className,
      onClick,
      ref: innerRef,
    },
  );
}
