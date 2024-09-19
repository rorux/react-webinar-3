import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Store from '../../store';
import List from '../list';
import CartItem from '../cart-item';
import { ItemType } from '../list-item';
import './style.css';

function CartModal({ totalSum, cartList, store }) {
  const cn = bem('CartModal');

  return (
    <div className={cn()}>
      <List list={cartList} component={<CartItem store={store} />} />
      <div className={cn('total')}>
        <div className={cn('label')}>
          <strong>Итого</strong>
        </div>
        <div className={cn('sum')}>
          <strong>{`${totalSum.toLocaleString()} ₽`}</strong>
        </div>
      </div>
    </div>
  );
}

CartModal.propTypes = {
  cartList: PropTypes.arrayOf(ItemType),
  totalSum: PropTypes.number.isRequired,
  store: PropTypes.instanceOf(Store),
};

export default React.memo(CartModal);
