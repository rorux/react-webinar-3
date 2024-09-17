import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Head from '../head';
import { useDelay } from './use-delay';
import './style.css';

const cn = bem('Modal');

function Modal({ isOpen, onClose, delay = 300, children }) {
  const { opened, closed, close } = useDelay({ isOpen, onClose, delay });

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={cn(undefined, [isOpen ? 'active' : undefined])} onClick={() => close()}>
      <div
        className={cn('content', { opened, fading: closed }, [isOpen ? 'active' : undefined])}
        onClick={e => e.stopPropagation()}
      >
        <Head title="Корзина" />
        <button className={cn('close', ['action-btn'])} onClick={onClose}>
          Закрыть
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  delay: PropTypes.number,
  children: PropTypes.node,
};

export default React.memo(Modal);
