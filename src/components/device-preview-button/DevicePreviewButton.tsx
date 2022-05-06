import React from 'react';
import { AiOutlineDesktop, AiOutlineTablet } from 'react-icons/ai';
import { BsPhone } from 'react-icons/bs';
import { PreviewDeviceTypes } from '../preview-window/PreviewWindow';
import './devicepreviewbutton.scss';

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

  const getTitle = () => {
    switch (deviceType) {
      case 'desktop':
        return '100%';
      case 'tablet':
        return '768px';
      case 'mobile':
        return '375px';
      default:
        return '100%';
    }
  };

  return (
    <button title={getTitle()} type="button" data-type={deviceType} className={`device__preview-button${isActive ? ' active' : ''}`} onClick={onClick}>
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
