import React, { useEffect, useState } from 'react';
import DevicePreviewButton, { PreviewDeviceTypes } from './components/device-preview-button/DevicePreviewButton';
import CollapisbleMenu from './components/menus/collapsible_menu/CollapsibleMenu';
import Modal from './components/modal/Modal';
import Navbar from './components/navbar/Navbar';
import SearchBox from './components/searchbox/SearchBox';
import Text from './components/text/Text';

function App() {
  const [currentPreviewingDevice, setCurrentPreviewDevice] = useState<HTMLElement | null>(null);

  const previewDevices : Record<PreviewDeviceTypes, string> = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  const onDevicePreviewButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (currentPreviewingDevice) {
      currentPreviewingDevice.classList.remove('active');
    }

    const target = event.currentTarget;
    target.classList.add('active');

    setCurrentPreviewDevice(target);

    const previewWindow = document.getElementById('preview-window') as HTMLDivElement;
    previewWindow.style.maxWidth = previewDevices[target.getAttribute('data-type') as PreviewDeviceTypes];
  };

  useEffect(() => {
    const currentDevice = document.querySelector('.device__preview-button.active') as HTMLDivElement;
    if (currentDevice) {
      setCurrentPreviewDevice(currentDevice);
    }
  }, []);

  return (
    <>
      <CollapisbleMenu position="left">
        <SearchBox />
      </CollapisbleMenu>
      <div className="main__content">
        <div className="main__content__wrapper">
          <Navbar className="main__nav">
            <div className="main__nav__page-details">
              <Text className="main__nav__page-name" heading="h3">Hello</Text>
            </div>
            <div className="main__nav__views">
              <ul className="main__nav__view__listing">
                <li className="active main__nav__view__listed-item"><a href="#editor">Editor</a></li>
                <li className="main__nav__view__listed-item"><a href="#settings">Settings</a></li>
              </ul>
            </div>
            <div className="main__nav__responsive-modes">
              <DevicePreviewButton deviceType="mobile" onClick={onDevicePreviewButtonClick} />
              <DevicePreviewButton deviceType="tablet" onClick={onDevicePreviewButtonClick} />
              <DevicePreviewButton onClick={onDevicePreviewButtonClick} isActive />
            </div>
          </Navbar>
          <div className="main__preview__container">
            <div id="preview-window" className="main__preview__container__inner">
              <span>Hello World</span>
            </div>
          </div>
        </div>
      </div>
      <CollapisbleMenu position="right" closedByDefault>
        <p>Right Menu</p>
      </CollapisbleMenu>
      <Modal>
        <h1>Hello World</h1>
      </Modal>
    </>
  );
}

export default App;
