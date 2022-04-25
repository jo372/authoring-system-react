import * as React from 'react';
import WithClickHandler from '../../hoc/withClickHandler/withClickHandler';
import Image, { ImageProps } from '../image/Image';
import Text, { TextProps } from '../text/Text';
import './text-image.scss';

type CherryPickedProps = Pick<TextProps, 'className'> & ImageProps;

interface TextImageProps extends CherryPickedProps {
  title?: string;
  heading?: string;
  paragraph?: string;
  innerRef?: React.RefObject<HTMLImageElement>;
  className?: string | undefined;
}

function TextImage(props: TextImageProps) {
  const {
    src,
    alt,
    title,
    heading,
    paragraph,
    className,
    onClick,
    innerRef,
  } = props;

  const hasClassName = className ? ` ${className}` : '';

  return (
    <div className={`text-image-wrapper${hasClassName}`}>
      <div className="text-image-container">
        <div className="text-image--image">
          <Image innerRef={innerRef} src={src} alt={alt} className={className} onClick={onClick} />
        </div>
        <div className="text-image--text">
          <div className="text-image--text-container">
            <Text text={title} className="text-image--title" heading="h1" />
            <Text text={heading} className="text-image--heading" heading="h3" />
            <Text text={paragraph} className="text-image--paragraph" heading="p" />
          </div>
        </div>
      </div>
    </div>
  );
}

TextImage.defaultProps = {
  title: 'Title',
  heading: 'Heading',
  paragraph: 'Paragraph',
  className: undefined,
  innerRef: undefined,
};

export default WithClickHandler(TextImage);
