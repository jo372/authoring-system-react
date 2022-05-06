import React, { useEffect, useState } from 'react';
import { AiOutlineFullscreen } from 'react-icons/ai';
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
import { TextImageProps } from './components/text-image/TextImage';
import TextImageWithEditButtons, { TextImageWithEditButtonsProps } from './components/text-image/TextImageWithEditButtons';
import Text from './components/text/Text';
import TextWithEditButtons, { TextWithEditButtonsProps } from './components/text/TextWithEditButtons';
import Title, { TitleProps } from './components/title/Title';
import CreatableElementType from './util/CreatableElementType';

/* eslint-disable */


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

  const [
    title,
    setTitle,
  ] = useState<string>('Untitled');

  const {
    TEXT,
    TEXT_IMAGE,
    HEADING,
    TITLE,
  } = CreatableElementType;

  const [
    arePanelsVisible,
    setPanelsVisible,
  ] = useState<boolean>(true);

  useEffect(() => {
    const currentDevice = document.querySelector('.device__preview-button.active') as HTMLDivElement;

    if (currentDevice) {
      currentDevice.click();
    }
  }, []);

  const generateNewKeyForType = (type: CreatableElementType) => `${type}-${Date.now()}-${children.length}`;

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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setSelectedItem(null);
  };

  const addChild = (child: JSX.Element) => {
    setChildren((children) => [...children, child]);
  };

  const togglePanelVisibility = () => {
    setPanelsVisible(!arePanelsVisible);
  };
  const onDeleteHandler = (key: React.Key) => {
    // setChildren(children => children.filter(child => child.key !== key));
    setChildren((children) => children.filter((child) => {
      if (child.key === key) {
        return false;
      }

      return true;
    }));
  };

  const onUpArrowHandler = (key: React.Key) => {
    setChildren((children) => {
      const currentItemIndex = children.findIndex((child) => child.key === key);
      if (currentItemIndex > 0) {
        const newChildren = [...children];
        const currentItem = newChildren.splice(currentItemIndex, 1)[0];
        newChildren.splice(currentItemIndex - 1, 0, currentItem);
        return newChildren;
      }
      return children;
    });
  };

  const onDownHandler = (key: React.Key) => {
    setChildren((children) => {
      const currentItemIndex = children.findIndex((child) => child.key === key);
      if (currentItemIndex < children.length - 1) {
        const newChildren = [...children];
        const currentItem = newChildren.splice(currentItemIndex, 1)[0];
        newChildren.splice(currentItemIndex + 1, 0, currentItem);
        return newChildren;
      }
      return children;
    });
  };

  const createTextElement = (props?: TextWithEditButtonsProps) => {
    const newItemKey = (props && 'key' in props) ? props.key : generateNewKeyForType(CreatableElementType.TEXT);
    const modifiedProps = {
      ...props,
      key: newItemKey,
    };
    return <TextWithEditButtons {...modifiedProps} />;
  };

  const createTitleElement = (props?: TitleProps) => {
    const newItemKey = (props && 'key' in props) ? props.key : generateNewKeyForType(CreatableElementType.TITLE);
    const modifiedProps = {
      ...props,
      key: newItemKey,
    };
    return <Title {...modifiedProps} />;
  };

  const createTextImageElement = (props: TextImageProps) => {
    const newItemKey = props.key ?? generateNewKeyForType(CreatableElementType.TEXT_IMAGE);
    const modifiedProps = {
      ...props,
      key: newItemKey,
    };
    return <TextImageWithEditButtons {...modifiedProps} />;
  };

  const onCloneHandler = (props: TextImageWithEditButtonsProps) => {
    setChildren((children) => [...children, createTextImageElement({
      ...props,
      key: generateNewKeyForType(CreatableElementType.TEXT_IMAGE),
    })]);
  };

  const onBlockButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { currentTarget } = event;
    const currentTargetType = currentTarget.dataset.type as CreatableElementType;

    if (currentTargetType === HEADING) {
      const key = generateNewKeyForType(CreatableElementType.HEADING);
      const props : TextWithEditButtonsProps = {
        align: 'center',
        onDownArrow: () => onDownHandler(key),
        onUpArrow: () => onUpArrowHandler(key),
        onDelete: () => onDeleteHandler(key),
        heading: 'h1',
      };
      const text = createTextElement(props);
      addChild(text);
    }

    if (currentTargetType === TITLE) {
      const key = generateNewKeyForType(CreatableElementType.TITLE);
      const props : TextWithEditButtonsProps = {
        align: 'center',
        onDownArrow: () => onDownHandler(key),
        onUpArrow: () => onUpArrowHandler(key),
        onDelete: () => onDeleteHandler(key),
      };
      const text = createTitleElement(props);
      addChild(text);
    }

    if (currentTargetType === TEXT) {
      const key = generateNewKeyForType(CreatableElementType.TEXT);
      const props : TextWithEditButtonsProps = {
        align: 'center',
        onDownArrow: () => onDownHandler(key),
        onUpArrow: () => onUpArrowHandler(key),
        onDelete: () => onDeleteHandler(key),
      };
      const text = createTextElement(props);
      addChild(text);
    }

    if (currentTargetType === TEXT_IMAGE) {
      const imageRef: React.RefObject<HTMLImageElement> = React.createRef();
      const key = generateNewKeyForType(CreatableElementType.TEXT_IMAGE);
      const props : TextImageWithEditButtonsProps = {
        innerRef: imageRef,
        key,
        src: 'https://via.placeholder.com/800',
        onDelete: () => onDeleteHandler(key),
        onClone: () => onCloneHandler(props),
        onUpArrow: () => onUpArrowHandler(key),
        onDownArrow: () => onDownHandler(key),
        onClick: () => {
          toggleModal();
          setSelectedItem(imageRef);
        },
      };
        // addChild(createTextImageElement(props));
      const newItemKey = props && props.key ? props.key : generateNewKeyForType(CreatableElementType.TEXT_IMAGE);
      const modifiedProps = {
        ...props,
        key: newItemKey,
      };
      addChild(<TextImageWithEditButtons {...modifiedProps} />);
    }
  };

  const CollapsibleListRef = React.createRef<HTMLDivElement>();
  const onSearchHandler = (value: string) => {
    if (CollapsibleListRef.current) {
      const items = CollapsibleListRef.current.querySelectorAll('li');

      if (value === '') {
        items.forEach((item) => item.classList.remove('search-result--hidden'));
        return;
      }

      items.forEach((item) => {
        const text = item.innerText;
        const matches = text.toLowerCase().includes(value.toLowerCase());
        // item.style.display = matches ? 'block' : 'none';
        if (!matches) {
          item.classList.add('search-result--hidden');
        } else {
          item.classList.remove('search-result--hidden');
        }
      });
    }
  };

  return (
    <>
      <CollapisbleMenu position="left" closedByDefault={arePanelsVisible}>
        <SearchBox onSearch={onSearchHandler} />
        <CollapsibleList innerRef={CollapsibleListRef} id="pages-list" className="pages__list" title="Page" isOpen>
          <li className="bold">{title}</li>
        </CollapsibleList>
      </CollapisbleMenu>
      <div className="main__content">
        <div className="main__content__wrapper">
          <Navbar className="main__nav">
            <div className="main__nav__page-details">
              <Text
                className="main__nav__page-name"
                heading="h3"
                text={title}
                onLeave={
                  (textRef: React.RefObject<HTMLElement>) => {
                    if (textRef.current) {
                      setTitle(textRef.current.innerText);
                    }
                  }
                }
              />
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
              <button type="button" className="device__preview-button" onClick={togglePanelVisibility}><AiOutlineFullscreen /></button>
            </div>
          </Navbar>
          <div className="main__preview__container">
            <PreviewWindow id="preview-window" className="main__preview__container__inner" maxWidth={previewDeviceMaxWidth}>
              { children }
            </PreviewWindow>
          </div>
        </div>
      </div>
      <CollapisbleMenu position="right" closedByDefault={arePanelsVisible}>
        <p>Block List</p>
        <BlockButton text="Text" type={CreatableElementType.TEXT} onClick={onBlockButtonClickHandler} />
        <BlockButton text="Text Image" type={CreatableElementType.TEXT_IMAGE} onClick={onBlockButtonClickHandler} />
        <BlockButton text="Heading" type={CreatableElementType.HEADING} onClick={onBlockButtonClickHandler} />
        <BlockButton text="Title" type={CreatableElementType.TITLE} onClick={onBlockButtonClickHandler} />
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
