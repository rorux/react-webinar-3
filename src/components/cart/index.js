import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Store from '../../store';
import CartInfo from '../cart-info';
import './style.css';

function Cart({ store, openModal }) {
  const cn = bem('Cart');
  const { totalSum, totalCount } = store.getState().cart;

  return (
    <div className={cn()}>
      <div className={cn('label')}>В корзине:</div>
      <div className={cn('info')}>
        <CartInfo totalSum={totalSum} totalCount={totalCount} />
      </div>
      <div className={cn('actions')}>
        <button className="action-btn" onClick={openModal}>
          Перейти
        </button>
      </div>
    </div>
  );
}

Cart.propTypes = { store: PropTypes.instanceOf(Store), openModal: PropTypes.func };

export default Cart;
