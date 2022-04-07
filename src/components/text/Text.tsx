import React, { useEffect } from 'react';

type TextHeadingTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface TextProps {
  text?: string;
  className?: string;
  heading?: TextHeadingTypes;
  editable?: boolean;
}

function Text(props: TextProps) {
  const {
    className,
    heading,
    text,
    editable,
  } = { ...Text.defaultProps, ...props };

  const [isEditable, setIsEditable] = React.useState<boolean>(editable);

  const [textValue, setTextValue] = React.useState<string>(text);

  const textRef = React.useRef<HTMLParagraphElement | HTMLHeadingElement>(null);

  useEffect(() => {
    const onClickHandler = (event: MouseEvent) => {
      setIsEditable(event.currentTarget === textRef.current);
    };

    window.addEventListener('click', onClickHandler);

    return window.removeEventListener('click', onClickHandler);
  }, []);

  useEffect(() => {
    (textRef && isEditable) && textRef.current?.focus();
  }, [textRef, isEditable]);

  const onClickHandler = () => {
    setIsEditable(true);
  };

  const onEnterKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { currentTarget } = event;

    if (isEditable && event.key === 'Enter') {
      setTextValue(currentTarget.innerText);
      setIsEditable(false);
    }
  };

  return React.createElement(
    heading || 'p',
    {
      className,
      onClick: onClickHandler,
      onKeyDown: onEnterKeyDown,
      contentEditable: isEditable || undefined,
      suppressContentEditableWarning: true,
      ref: textRef,
    },
    textValue,
  );
}

Text.defaultProps = {
  text: 'Add Text Here',
  className: undefined,
  heading: '',
  editable: false,
};

export default Text;
