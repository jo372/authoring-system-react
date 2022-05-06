import WithEditButtons, { WithEditButtonsProps } from '../../hoc/withEditButtons/withEditButtons';
import Text from '../text/Text';
import './title.scss';

/* eslint-disable */

export interface TitleProps extends WithEditButtonsProps {
  headingText?: string;
  paragraphText?: string;
  key?: string;
  children?: React.ReactNode;
}

function Title(props: TitleProps) {
  const {
    headingText,
    paragraphText,
    key,
    children,
    onComponentClick,
  } = props;

  return (
    <div className="title-wrapper" key={key} onClick={onComponentClick}>
      <Text text={headingText} className="title" heading="h1" />
      <Text text={paragraphText} className="paragraph" heading="p" />
      { children }
    </div>
  );
}

Title.defaultProps = {
  headingText: 'Insert heading text',
  paragraphText: 'Insert paragraph text',
};

export default WithEditButtons(Title);
