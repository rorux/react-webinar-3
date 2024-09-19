import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Head from '../head';
import './style.css';

const cn = bem('Modal');

function Modal({ title, opened, onClose, children }) {
  if (!opened) return null;

  return (
    <div className={cn(undefined, [opened ? 'active' : undefined])} onClick={onClose}>
      <div
        className={cn('content', { opened }, [opened ? 'active' : undefined])}
        onClick={e => e.stopPropagation()}
      >
        <Head title={title} />
        <button className={cn('close', ['action-btn'])} onClick={onClose}>
          Закрыть
        </button>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  opened: PropTypes.bool,
  onClose: PropTypes.func,
  delay: PropTypes.number,
  children: PropTypes.node,
};

export default React.memo(Modal);
