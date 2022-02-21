import React from 'react';
import { AiOutlineDesktop, AiOutlineTablet } from 'react-icons/ai';
import { BsPhone } from 'react-icons/bs';
import './devicepreviewbutton.scss';

export type PreviewDeviceTypes = 'desktop' | 'tablet' | 'mobile';

interface DevicePreviewButtonProps {
  deviceType?: PreviewDeviceTypes;
  isActive?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function DevicePreviewButton({
  deviceType = 'desktop',
  isActive,
  onClick,
} : DevicePreviewButtonProps) {
  const getIcon = () => {
    switch (deviceType) {
      case 'desktop':
        return <AiOutlineDesktop />;
      case 'tablet':
        return <AiOutlineTablet />;
      case 'mobile':
        return <BsPhone />;
      default:
        return <AiOutlineDesktop />;
    }
  };

  return (
    <button type="button" data-type={deviceType} className={`device__preview-button${isActive ? ' active' : ''}`} onClick={onClick}>
      { getIcon() }
    </button>
  );
}

DevicePreviewButton.defaultProps = {
  deviceType: 'desktop',
  isActive: false,
  onClick: undefined,
};

export default DevicePreviewButton;
