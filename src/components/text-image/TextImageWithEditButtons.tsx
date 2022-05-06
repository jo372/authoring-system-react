import * as React from 'react';
import WithEditButtons, { WithEditButtonsProps } from '../../hoc/withEditButtons/withEditButtons';
import TextImage, { TextImageProps } from './TextImage';

export interface TextImageWithEditButtonsProps extends TextImageProps, WithEditButtonsProps {}

/* eslint-disable */

function TextImageWithEditButtons(props: TextImageWithEditButtonsProps) {
  const {
    children,
    onComponentClick,
    ...rest
  } = props;

  return (
    <div className="text-image-block" onClick={onComponentClick}>
      <TextImage {...rest} />
      { children }
    </div>
  );
}

export default WithEditButtons(TextImageWithEditButtons);
