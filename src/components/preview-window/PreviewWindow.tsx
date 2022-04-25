import * as React from 'react';

export type PreviewDeviceTypes = 'desktop' | 'tablet' | 'mobile';
export type PreviewDeviceWidths = '100%' | '768px' | '375px';
export const PreviewDevices : Record<PreviewDeviceTypes, PreviewDeviceWidths> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

interface PreviewWindowProps {
  children?: React.ReactNode;
  className?: string;
  maxWidth?: string;
  id?: string | undefined;
}

export function PreviewWindow(props: PreviewWindowProps) {
  const {
    children,
    className,
    maxWidth,
    id,
  } = props;

  const hasClassName = className ? ` ${className}` : '';

  return (
    <div
      className={`preview-window${hasClassName}`}
      id={id}
      style={{
        maxWidth,
      }}
    >
      {
        children || <p className="text-center">Add Content, open the right side panel - if closed.</p>
      }
    </div>
  );
}

PreviewWindow.defaultProps = {
  children: [],
  className: '',
  maxWidth: '100%',
  id: undefined,
};

export default PreviewWindow;
