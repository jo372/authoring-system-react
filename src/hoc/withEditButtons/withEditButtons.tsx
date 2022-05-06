import * as React from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { FaRegClone } from 'react-icons/fa';
import { RiDeleteBin7Line } from 'react-icons/ri';
import useOutsideAlerter from '../useOutsideAlterer/useOutsideAlerter';
import './withEditButtons.scss';

export interface WithEditButtonsProps {
  children?: React.ReactNode;
  onDelete?: () => void;
  onClone?: () => void;
  onUpArrow?: () => void;
  onDownArrow?: () => void;
  onComponentClick?: () => void;
}

export function WithEditButtons<T extends WithEditButtonsProps>(
  WrappedComponent: React.ComponentType<T>,
) {
  return function (props: T) {
    const {
      children,
      onDelete,
      onClone,
      onUpArrow,
      onDownArrow,
      onComponentClick,
      ...rest
    } = props;

    const editButtonRef : React.RefObject<HTMLDivElement> = React.createRef();

    const toggleEditButtonVisibility = () => {
      if (editButtonRef.current) {
        editButtonRef.current.classList.remove('hidden');
      }
    };

    useOutsideAlerter(editButtonRef, () => {
      if (editButtonRef.current) {
        editButtonRef.current.classList.add('hidden');
      }
    });

    return (
      <WrappedComponent
        onComponentClick={toggleEditButtonVisibility}
        {...rest as T}
      >
        <div ref={editButtonRef} className="edit-buttons hidden">
          <button type="button" onClick={onDelete} className="delete-button" aria-label="Delete Button"><RiDeleteBin7Line /></button>
          <button type="button" onClick={onClone} className="clone-button" aria-label="Clone Button"><FaRegClone /></button>
          <div className="arrow-buttons">
            <button type="button" onClick={onUpArrow} className="up-arrow-button" aria-label="Move Item Up"><BsChevronUp /></button>
            <button type="button" onClick={onDownArrow} className="down-arrow-button" aria-label="Move Item Down"><BsChevronDown /></button>
          </div>
        </div>
      </WrappedComponent>
    );
  };
}

export default WithEditButtons;
