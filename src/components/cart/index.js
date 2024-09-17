import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CartInfo from '../cart-info';
import CartModal from '../cart-modal';
import Modal from '../modal';
import { ItemType } from '../item';
import './style.css';

function Cart({ cartList, removeItemFromCart }) {
  const [openedModal, setOpenedModal] = useState(false);
  const cn = bem('Cart');

  const totalSum = useMemo(
    () => cartList.reduce((acc, item) => acc + item.count * item.price, 0),
    [cartList],
  );

  // закрывать модальное окно когда корзина пустая
  useEffect(() => {
    !cartList.length && setOpenedModal(false);
  }, [cartList]);

  return (
    <div className={cn()}>
      <div className={cn('label')}>В корзине:</div>
      <div className={cn('info')}>
        <CartInfo cartList={cartList} totalSum={totalSum} />
      </div>
      <div className={cn('actions')}>
        <button
          className="action-btn"
          onClick={() => setOpenedModal(true)}
          disabled={!cartList.length}
        >
          Перейти
        </button>
      </div>
      <Modal isOpen={openedModal} onClose={() => setOpenedModal(false)}>
        <CartModal
          cartList={cartList}
          removeItemFromCart={removeItemFromCart}
          totalSum={totalSum}
        />
      </Modal>
    </div>
  );
}

Cart.propTypes = {
  cartList: PropTypes.arrayOf(ItemType).isRequired,
  removeItemFromCart: PropTypes.func.isRequired,
};

export default React.memo(Cart);
