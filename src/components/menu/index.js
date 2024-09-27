import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Menu({ items = [] }) {
  const cn = bem('Menu');

  return (
    <div className={cn()}>
      {items.map((item, idx) => (
        <Link key={idx} to={item.path} className={cn('item')}>
          {item.label}
        </Link>
      ))}
    </div>
  );
}

Menu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
};

export default memo(Menu);
