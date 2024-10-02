import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Head({ title, children }) {
  const cn = bem('Head');

  return (
    <div className={cn()}>
      <div className={cn('place')}>
        <h1>{title}</h1>
      </div>
      <div className={cn('place')}>{children}</div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};

export default memo(Head);
