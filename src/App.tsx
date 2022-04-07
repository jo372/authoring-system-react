import React, { useEffect, useState } from 'react';
import BlockButton from './components/block-button/BlockButton';
import CollapsibleList from './components/collapsible-list/CollapsibleList';
import DevicePreviewButton from './components/device-preview-button/DevicePreviewButton';
import CollapisbleMenu from './components/menus/collapsible_menu/CollapsibleMenu';
import Modal from './components/modal/Modal';
import Navbar from './components/navbar/Navbar';
import {
  PreviewWindow, PreviewDevices, PreviewDeviceTypes, PreviewDeviceWidths,
} from './components/preview-window/PreviewWindow';
import SearchBox from './components/searchbox/SearchBox';
import Text from './components/text/Text';
import CreatableElementType from './util/CreatableElementType';

function App() {
  const [
    currentPreviewingDevice,
    setCurrentPreviewDevice,
  ] = useState<HTMLElement | null>(null);
  const [
    children,
    setChildren,
  ] = useState<JSX.Element[]>([]);
  const [
    previewDeviceMaxWidth,
    setPreviewDeviceMaxWidth,
  ] = useState<PreviewDeviceWidths>(PreviewDevices.desktop);

  useEffect(() => {
    const currentDevice = document.querySelector('.device__preview-button.active') as HTMLDivElement;

    currentDevice && currentDevice.click();
  }, []);

  const setPreviewWindowToPreviewDevice = (deviceType: PreviewDeviceTypes) => {
    setPreviewDeviceMaxWidth(PreviewDevices[deviceType]);
  };

  const onDevicePreviewButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (currentPreviewingDevice) {
      currentPreviewingDevice.classList.remove('active');
    }

    const target = event.currentTarget;
    target.classList.add('active');

    setCurrentPreviewDevice(target);
    setPreviewWindowToPreviewDevice(target.dataset.type as PreviewDeviceTypes);
  };

  const createEditCopyDeleteHoverMenu = (text: string) => (
    <li>
      {' '}
      { text }
      {' '}
    </li>
  );

  const addChild = (child: JSX.Element) => {
    setChildren([...children, child]);
  };

  const onBlockButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { currentTarget } = event;
    const currentTargetType = currentTarget.dataset.type as CreatableElementType;

    const {
      TEXT,
    } = CreatableElementType;

    switch (currentTargetType) {
      case TEXT:
        addChild(<Text key={`text-${Date.now()}`} />);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <CollapisbleMenu position="left">
        <SearchBox />
        <CollapsibleList id="pages-list" className="pages__list" title="Page" isOpen>
          { createEditCopyDeleteHoverMenu('test') }
          <li>test 2</li>
          <li>test 3</li>
        </CollapsibleList>
      </CollapisbleMenu>
      <div className="main__content">
        <div className="main__content__wrapper">
          <Navbar className="main__nav">
            <div className="main__nav__page-details">
              <Text className="main__nav__page-name" heading="h3" text="Hello" />
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
            <PreviewWindow className="main__preview__container__inner" maxWidth={previewDeviceMaxWidth}>
              { children }
            </PreviewWindow>
          </div>
        </div>
      </div>
      <CollapisbleMenu position="right">
        <p>Block List</p>
        <BlockButton text="Text" type={CreatableElementType.TEXT} onClick={onBlockButtonClickHandler} />
        <BlockButton text="Container" type={CreatableElementType.CONTAINER} onClick={onBlockButtonClickHandler} />
        <BlockButton text="Image" type={CreatableElementType.IMAGE} onClick={onBlockButtonClickHandler} />
        <BlockButton text="Gallery" type={CreatableElementType.GALLERY} onClick={onBlockButtonClickHandler} />
        <BlockButton text="List" type={CreatableElementType.LIST} onClick={onBlockButtonClickHandler} />
        <BlockButton text="Link" type={CreatableElementType.LINK} onClick={onBlockButtonClickHandler} />
        <BlockButton text="Youtube Video" type={CreatableElementType.YOUTUBE_VIDEO} onClick={onBlockButtonClickHandler} />
        <BlockButton text="Footer" type={CreatableElementType.FOOTER} onClick={onBlockButtonClickHandler} />
        <BlockButton text="Navbar" type={CreatableElementType.NAVBAR} onClick={onBlockButtonClickHandler} />
        <BlockButton text="Button" type={CreatableElementType.BUTTON} onClick={onBlockButtonClickHandler} />
      </CollapisbleMenu>
      <Modal>
        <h1>Hello World</h1>
      </Modal>
    </>
  );
}

export default App;
