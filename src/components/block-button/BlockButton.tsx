import * as React from 'react';
import CreatableElementType from '../../util/CreatableElementType';

interface BlockButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  text?: string;
  type?: CreatableElementType;
}

export default function BlockButton(props: BlockButtonProps) {
  const { onClick, text, type } = props;
  return (
    <button className="block-button" type="button" onClick={onClick} data-type={type}>
      <span>{text}</span>
    </button>
  );
}

BlockButton.defaultProps = {
  onClick: () => {},
  text: 'Add Text Here',
  type: CreatableElementType.TEXT,
};
