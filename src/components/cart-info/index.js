import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';

const getPlural = count =>
  plural(count, {
    one: 'товар',
    few: 'товара',
    many: 'товаров',
  });

function CartInfo({ totalSum, totalCount }) {
  if (totalCount === 0) return <strong>пусто</strong>;

  return (
    <strong>
      {`${totalCount} ${getPlural(totalCount)}`} / {`${totalSum.toLocaleString()} ₽`}
    </strong>
  );
}

CartInfo.propTypes = {
  totalSum: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default React.memo(CartInfo);
