import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Loader({ text }) {
  const cn = bem('Loader');

  return <div className={cn()}>{text}</div>;
}

Loader.propTypes = {
  text: PropTypes.string,
};

export default memo(Loader);
