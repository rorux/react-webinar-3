import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import { ItemType } from '../item';

const getPlural = count =>
  plural(count, {
    one: 'товар',
    few: 'товара',
    many: 'товаров',
  });

function CartInfo({ cartList, totalSum }) {
  if (!cartList.length) return <strong>пусто</strong>;

  const count = cartList.length;

  return (
    <strong>
      {`${count} ${getPlural(count)}`} / {`${totalSum} ₽`}
    </strong>
  );
}

CartInfo.propTypes = {
  cartList: PropTypes.arrayOf(ItemType).isRequired,
  totalSum: PropTypes.number.isRequired,
};

export default React.memo(CartInfo);
