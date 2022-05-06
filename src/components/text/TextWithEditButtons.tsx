/* eslint-disable */

import React from 'react';
import WithEditButtons, { WithEditButtonsProps } from '../../hoc/withEditButtons/withEditButtons';
import Text, { TextProps } from './Text';

export interface TextWithEditButtonsProps extends TextProps, WithEditButtonsProps {}

function TextWithEditButtons(props: TextWithEditButtonsProps) {
  const {
    children,
    onComponentClick,
    key,
    ...rest
  } = props;

  return (
    <div className="text-block" onClick={onComponentClick} key={key}>
      <Text heading="h3" {...rest} />
      {children}
    </div>
  );
}

export default WithEditButtons(TextWithEditButtons);
