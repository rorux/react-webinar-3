import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Head({ title, content }) {
  const cn = bem('Head');

  return (
    <div className={cn()}>
      <h1>{title}</h1>
      <div className={cn('content')}>{content}</div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  content: PropTypes.node,
};

export default memo(Head);
