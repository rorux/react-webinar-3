import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Store from '../../store';
import { ItemType } from '../list-item';
import './style.css';

function CartItem(props) {
  const cn = bem('CartItem');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{props.item.price?.toLocaleString()}&nbsp;₽</div>
      <div className={cn('count')}>{props.item.count}&nbsp;шт</div>
      <div className={cn('actions')}>
        <button
          className="action-btn"
          onClick={() => props.store.removeItemFromCart(props.item.code)}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: ItemType,
  store: PropTypes.instanceOf(Store),
};

export default React.memo(CartItem);
