import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Store from '../../store';
import './style.css';

export const ItemType = PropTypes.shape({
  code: PropTypes.number,
  title: PropTypes.string,
  price: PropTypes.number,
  count: PropTypes.number,
});

function ListItem(props) {
  const cn = bem('ListItem');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{props.item.price.toLocaleString()}&nbsp;₽</div>
      <div className={cn('actions')}>
        <button className="action-btn" onClick={() => props.store.addItemToCart(props.item.code)}>
          Добавить
        </button>
      </div>
    </div>
  );
}

ListItem.propTypes = {
  item: ItemType,
  store: PropTypes.instanceOf(Store),
};

export default React.memo(ListItem);
