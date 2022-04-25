import React, { useEffect } from 'react';
import useOutsideAlerter from '../../hoc/useOutsideAlterer/useOutsideAlerter';

type TextHeadingTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

export interface TextProps {
  text?: string;
  className?: string;
  heading?: TextHeadingTypes;
  editable?: boolean;
}

function Text({
  text = 'Add Text Here',
  className = undefined,
  heading = 'p',
  editable = false,
}: TextProps) {
  const [isEditable, setIsEditable] = React.useState<boolean>(editable);

  const [textValue, setTextValue] = React.useState<string>(text);

  const textRef = React.useRef<HTMLParagraphElement | HTMLHeadingElement>(null);

  const onClickHandler = () => {
    setIsEditable(true);
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

  return React.createElement(
    heading,
    {
      className,
      onClick: onClickHandler,
      contentEditable: isEditable,
      suppressContentEditableWarning: true,
      ref: textRef,
    },
    textValue,
  );
}

Text.defaultProps = {
  text: 'Add Text Here',
  className: undefined,
  heading: 'p',
  editable: false,
};

export default Text;
