import React from 'react';
import './modal.scss';

interface ModalEventListeners {
  onAccept?: () => void;
  onDeny?: () => void;
}

interface ModalTextProps {
  title?: string;
  acceptText?: string;
  denyText?: string;
}

interface ModalProps extends ModalEventListeners, ModalTextProps {
  isHidden?: boolean;
  children?: React.ReactNode;
}

type DivOrButtonTarget = HTMLDivElement | HTMLButtonElement;
type MouseAndKeyboardEvent = React.MouseEvent<DivOrButtonTarget, MouseEvent> |
React.KeyboardEvent<DivOrButtonTarget>;

function Modal(props: ModalProps) {
  const {
    onAccept,
    onDeny,
    title,
    acceptText,
    denyText,
    isHidden,
    children,
  } = props;

  const [isModalHidden, setModalHidden] = React.useState(isHidden);

  const hideModalWindow = (e: MouseAndKeyboardEvent) => {
    e.preventDefault();
    setModalHidden(true);
  };

  const keyboardEventHandler = (e: React.KeyboardEvent<DivOrButtonTarget>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      hideModalWindow(e);
    }
  };

  return (
    <div className={`modal${isModalHidden ? ' hidden' : ''}`}>
      <div tabIndex={0} role="button" aria-label="Close Modal Overlay" className="modal__overlay" onClick={hideModalWindow} onKeyDown={keyboardEventHandler} />
      <div className="modal__wrapper">
        <div className="modal__header">
          <div className="modal__header-title">
            <h3>{ title }</h3>
          </div>
          <div className="modal__header-close">
            <button type="button" className="modal__close-button" onClick={hideModalWindow}>X</button>
          </div>
        </div>
        <div className="modal__body">
          { children }
        </div>
        <div className="modal__footer">
          <div className="modal__footer-buttons">
            <button
              type="button"
              className="modal__footer-button primary"
              onClick={(e: React.MouseEvent<DivOrButtonTarget>) => {
                hideModalWindow(e);
                if (onAccept) {
                  onAccept();
                }
              }}
              aria-label="Accept"
            >
              { acceptText }
            </button>
            <button
              type="button"
              className="modal__footer-button secondary"
              onClick={(e: React.MouseEvent<DivOrButtonTarget>) => {
                hideModalWindow(e);
                if (onDeny) {
                  onDeny();
                }
              }}
              aria-label="Deny"
            >
              { denyText }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.defaultProps = {
  isHidden: true,
  title: 'Warning!',
  acceptText: 'Okay',
  denyText: 'Close',
  onAccept: undefined,
  onDeny: undefined,
  children: undefined,
};

export default Modal;
