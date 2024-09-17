import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Item, { ItemType } from '../item';
import './style.css';

function CartModal({ cartList, removeItemFromCart, totalSum }) {
  const cn = bem('CartModal');

  return (
    <div className={cn()}>
      {cartList.map(item => (
        <div key={item.code} className={cn('item')}>
          <Item
            item={item}
            button={
              <button className="action-btn" onClick={() => removeItemFromCart(item.code)}>
                Удалить
              </button>
            }
          />
        </div>
      ))}
      <div className={cn('total')}>
        <div className={cn('label')}>
          <strong>Итого</strong>
        </div>
        <div className={cn('sum')}>
          <strong>{`${totalSum} ₽`}</strong>
        </div>
      </div>
    </div>
  );
}

CartModal.propTypes = {
  cartList: PropTypes.arrayOf(ItemType).isRequired,
  removeItemFromCart: PropTypes.func.isRequired,
  totalSum: PropTypes.number.isRequired,
};

export default React.memo(CartModal);
