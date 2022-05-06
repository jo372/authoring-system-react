import * as React from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import Image, { ImageProps } from '../image/Image';
import Text, { TextProps } from '../text/Text';
import './text-image.scss';

type CherryPickedProps = Pick<TextProps, 'className'> & ImageProps;

export interface TextImageProps extends CherryPickedProps {
  title?: string;
  heading?: string;
  paragraph?: string;
  innerRef?: React.RefObject<HTMLImageElement>;
  className?: string | undefined;
  children?: React.ReactNode;
  key?: string;
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
    children,
    key,
  } = props;

  const hasClassName = className ? ` ${className}` : '';

  return (
    <div className={`text-image-wrapper${hasClassName}`} key={key}>
      <div className="text-image-container">
        <div className="text-image--image">
          <Image innerRef={innerRef} src={src} alt={alt} className={className} onClick={onClick} />
          <div className="text-image--hover-overlay">
            <div className="text-image--hover-overlay-content">
              <div className="text-image--hover-overlay-icon">
                <AiOutlineCloudUpload />
              </div>
              <Text editable={false} align="center" text="Click to Change Image" />
            </div>
          </div>
        </div>
        <div className="text-image--text">
          <div className="text-image--text-container">
            <Text text={title} className="text-image--title" heading="h1" />
            <Text text={heading} className="text-image--heading" heading="h3" />
            <Text text={paragraph} className="text-image--paragraph" heading="p" />
          </div>
        </div>
        { children }
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

export default TextImage;
