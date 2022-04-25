import React, { useEffect, useState } from 'react';
import BlockButton from './components/block-button/BlockButton';
import CollapsibleList from './components/collapsible-list/CollapsibleList';
import DevicePreviewButton from './components/device-preview-button/DevicePreviewButton';
import ImageUploader from './components/image-uploader/ImageUploader';
import CollapisbleMenu from './components/menus/collapsible_menu/CollapsibleMenu';
import Modal from './components/modal/Modal';
import Navbar from './components/navbar/Navbar';
import {
  PreviewDevices, PreviewDeviceTypes, PreviewDeviceWidths, PreviewWindow,
} from './components/preview-window/PreviewWindow';
import SearchBox from './components/searchbox/SearchBox';
import TextImage from './components/text-image/TextImage';
import Text from './components/text/Text';
import CreatableElementType from './util/CreatableElementType';

function App() {
  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState<boolean>(false);

  const [
    currentPreviewingDevice,
    setCurrentPreviewDevice,
  ] = useState<HTMLElement | null>(null);

  const [
    currentlySelectedImage,
    setCurrentlySelectedImage,
  ] = useState<string | null>(null);

  const [
    selectedItem,
    setSelectedItem,
  ] = useState<React.RefObject<HTMLElement | HTMLImageElement> | null>(null);
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

    if (currentDevice) {
      currentDevice.click();
    }
  }, []);

  const setPreviewWindowToPreviewDevice = (deviceType: PreviewDeviceTypes) => {
    const target = document.getElementById('preview-window') as HTMLDivElement;

    target.classList.remove('desktop', 'tablet', 'mobile');
    target.classList.add(deviceType);

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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setSelectedItem(null);
  };

  const addChild = (child: JSX.Element) => {
    setChildren([...children, child]);
  };

  const onBlockButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { currentTarget } = event;
    const currentTargetType = currentTarget.dataset.type as CreatableElementType;

    const {
      TEXT,
      TEXT_IMAGE,
    } = CreatableElementType;

    let imageRef : React.RefObject<HTMLImageElement> | null = null;

    if (currentTargetType === TEXT_IMAGE) {
      imageRef = React.createRef<HTMLImageElement>();
    }

    switch (currentTargetType) {
      case TEXT:
        addChild(<Text key={`text-${Date.now()}`} />);
        break;
      case TEXT_IMAGE:
        if (imageRef) {
          addChild(<TextImage
            innerRef={imageRef}
            key={`text-image-${Date.now()}`}
            src="https://via.placeholder.com/800"
            onClick={() => {
              toggleModal();
              setSelectedItem(imageRef);
            }}
          />);
        }
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
            <PreviewWindow id="preview-window" className="main__preview__container__inner" maxWidth={previewDeviceMaxWidth}>
              { children }
            </PreviewWindow>
          </div>
        </div>
      </div>
      <CollapisbleMenu position="right">
        <p>Block List</p>
        <BlockButton text="Text" type={CreatableElementType.TEXT} onClick={onBlockButtonClickHandler} />
        <BlockButton text="Text Image" type={CreatableElementType.TEXT_IMAGE} onClick={onBlockButtonClickHandler} />
      </CollapisbleMenu>
      <Modal
        title="Upload Image"
        isHidden={!isModalOpen}
        onAccept={() => {
          if (selectedItem && selectedItem.current) {
            if (selectedItem.current instanceof HTMLImageElement && currentlySelectedImage) {
              selectedItem.current.src = currentlySelectedImage;
            }
          }
          toggleModal();
        }}
        onDeny={toggleModal}
      >
        <ImageUploader
          resetContents={!isModalOpen}
          onImageChange={(img) => setCurrentlySelectedImage(img)}
        />
      </Modal>
    </>
  );
}

export default App;
