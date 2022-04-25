import React, { useEffect } from 'react';

export default function useOutsideAlerter
  <T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback: () => void,
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => ref.current
      && !ref.current.contains(event.target as T)
      && callback();

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}
