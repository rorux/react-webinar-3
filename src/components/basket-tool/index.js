import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';

function BasketTool({
  sum = 0,
  amount = 0,
  onOpen = () => {},
  inCartLabel,
  oneProductLabel,
  fewProductsLabel,
  manyProductsLabel,
  emptyLabel,
  goLabel,
}) {
  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <span className={cn('label')}>{inCartLabel}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
              one: oneProductLabel,
              few: fewProductsLabel,
              many: manyProductsLabel,
            })} / ${numberFormat(sum)} ₽`
          : emptyLabel}
      </span>
      <button onClick={onOpen}>{goLabel}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  inCartLabel: PropTypes.string,
  oneProductLabel: PropTypes.string,
  fewProductsLabel: PropTypes.string,
  manyProductsLabel: PropTypes.string,
  emptyLabel: PropTypes.string,
  goLabel: PropTypes.string,
};

export default memo(BasketTool);
