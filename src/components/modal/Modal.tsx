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

export interface ModalProps extends ModalEventListeners, ModalTextProps {
  isHidden?: boolean;
  children?: React.ReactNode;
}

function Modal(props: ModalProps) {
  const {
    isHidden,
    onDeny,
    title,
    children,
    onAccept,
    acceptText,
    denyText,
  } = props;

  const hasHiddenCSSSelector = isHidden ? ' hidden' : '';

  return (
    <div className={`modal${hasHiddenCSSSelector}`}>
      <div
        tabIndex={0}
        role="button"
        aria-label="Close Modal Overlay"
        className="modal__overlay"
        onClick={onDeny}
        onKeyDown={onDeny}
      />
      <div className="modal__wrapper">
        <div className="modal__header">
          <div className="modal__header-title">
            <h3>{title}</h3>
          </div>
          <div className="modal__header-close">
            <button
              type="button"
              className="modal__close-button"
              onClick={onDeny}
            >
              X
            </button>
          </div>
        </div>
        <div className="modal__body">{children}</div>
        <div className="modal__footer">
          <div className="modal__footer-buttons">
            <button
              type="button"
              className="modal__footer-button primary"
              onClick={() => onAccept && onAccept()}
              aria-label="Accept"
            >
              {acceptText}
            </button>
            <button
              type="button"
              className="modal__footer-button secondary"
              onClick={() => onDeny && onDeny()}
              aria-label="Deny"
            >
              {denyText}
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
  onAccept: () => {},
  onDeny: () => {},
  children: [],
};

export default Modal;
