import React, { useEffect } from 'react';
import useOutsideAlerter from '../../hoc/useOutsideAlterer/useOutsideAlerter';

export type TextHeadingTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
type TextAlignmentTypes = 'left' | 'center' | 'right';

export interface TextProps {
  text?: string;
  className?: string;
  heading?: TextHeadingTypes;
  editable?: boolean;
  align?: TextAlignmentTypes;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onLeave?: (textRef: React.RefObject<HTMLElement>) => void;
  key?: string;
}

function Text({
  text = 'Add Text Here',
  className = undefined,
  heading = 'p',
  editable = false,
  align,
  onClick,
  children,
  onLeave,
  key,
}: TextProps) {
  const [isEditable, setIsEditable] = React.useState<boolean>(editable);

  const [textValue, setTextValue] = React.useState<string>(text);

  const textRef = React.useRef<HTMLElement>(null);

  const onClickHandler = (e: 
  React.MouseEvent<HTMLParagraphElement | HTMLHeadingElement, MouseEvent>) => {
    setIsEditable(true);
    if (onClick) {
      onClick(e);
    }
  };

  const removeContentEditableAttribute = () => {
    if (textRef.current) {
      textRef.current.removeAttribute('contenteditable');
    }
  };

  const onLeaveHandler = () => {
    if (isEditable && textRef.current) {
      setTextValue(textRef.current.innerText);
      setIsEditable(false);
      removeContentEditableAttribute();
      if (onLeave) {
        onLeave(textRef);
      }
    }
  };

  useEffect(() => {
    if (textRef.current) {
      if (!isEditable) {
        removeContentEditableAttribute();
        return;
      }
      textRef.current.focus();
    }
  }, [textRef, isEditable]);

  useOutsideAlerter(textRef, onLeaveHandler);

  let styling = className ? `${className}` : '';

  if (align) {
    const alignClass = `text-${align}`;
    styling += styling.length > 0 ? ` ${alignClass}` : `${alignClass}`;
  }

  return React.createElement(
    heading,
    {
      key,
      className: styling,
      onClick: onClickHandler,
      contentEditable: isEditable,
      suppressContentEditableWarning: true,
      ref: textRef,
    },
    [textValue, children],
  );
}

Text.defaultProps = {
  text: 'Add Text Here',
  className: undefined,
  heading: 'p',
  editable: false,
  align: 'left',
  onClick: undefined,
};

export default Text;
