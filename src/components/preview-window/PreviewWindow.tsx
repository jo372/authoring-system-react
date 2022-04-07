import * as React from 'react';

export type PreviewDeviceTypes = 'desktop' | 'tablet' | 'mobile';
export type PreviewDeviceWidths = '100%' | '768px' | '375px';
export const PreviewDevices : Record<PreviewDeviceTypes, PreviewDeviceWidths> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

interface PreviewWindowProps {
  children?: React.ReactNode[];
  className?: string;
  maxWidth?: string
}

export function PreviewWindow(props: PreviewWindowProps) {
  const {
    children,
    className,
  } = { ...PreviewWindow.defaultProps, ...props };

  return (
    <div
      className={className}
      style={{
        maxWidth: props.maxWidth,
      }}
    >
      { children.length > 0 ? children : <p className="text-center">Add Content, open the right side panel - if closed.</p> }
    </div>
  );
}

PreviewWindow.defaultProps = {
  children: [],
  className: '',
  maxWidth: '100%',
};

export default PreviewWindow;
