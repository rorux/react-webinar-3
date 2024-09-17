import { useCallback, useEffect, useRef, useState } from 'react';

export function useDelay({ isOpen, onClose, delay }) {
  const [closed, setClosed] = useState(true);
  const [opened, setOpened] = useState(false);
  const closeRef = useRef();
  const openRef = useRef();

  useEffect(() => {
    setClosed(!isOpen);
  }, [isOpen]);

  const openTimer = () => {
    openRef.current = setTimeout(() => {
      setOpened(true);
    }, delay);
  };

  useEffect(() => {
    isOpen && openTimer();
  }, [isOpen]);

  const close = useCallback(() => {
    setClosed(true);
    setOpened(false);
    closeRef.current = setTimeout(() => {
      onClose();
    }, delay);
  }, [onClose, delay]);

  const onKeyDown = e => {
    if (e.key === 'Escape') {
      close();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    return () => {
      clearTimeout(closeRef.current);
      clearTimeout(openRef.current);
    };
  }, []);

  return {
    closed,
    opened,
    close,
  };
}
