import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';

function ProductCard({
  product,
  onAdd,
  vendorLabel,
  categoryLabel,
  yearLabel,
  priceLabel,
  addLabel,
  noDataLabel,
}) {
  const cn = bem('ProductCard');

  const callbacks = {
    onAdd: e => onAdd?.(product._id),
  };

  return (
    <div className={cn()}>
      <div className={cn('description')}>{product.description || noDataLabel}</div>
      <div className={cn('vendor')}>
        {vendorLabel}: <strong>{product.vendor || noDataLabel}</strong>
      </div>
      <div className={cn('category')}>
        {categoryLabel}: <strong>{product.category || noDataLabel}</strong>
      </div>
      <div className={cn('year')}>
        {yearLabel}: <strong>{product.year || noDataLabel}</strong>
      </div>
      <div className={cn('price')}>
        {priceLabel}:{' '}
        {typeof product.price === 'number' ? (
          <strong>{numberFormat(product.price)} ₽</strong>
        ) : (
          noDataLabel
        )}
      </div>
      <div className={cn('action')}>
        <button onClick={callbacks.onAdd}>{addLabel}</button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    description: PropTypes.string,
    vendor: PropTypes.string,
    category: PropTypes.string,
    year: PropTypes.number,
    price: PropTypes.number,
  }),
  onAdd: PropTypes.func,
  vendorLabel: PropTypes.string,
  categoryLabel: PropTypes.string,
  yearLabel: PropTypes.string,
  priceLabel: PropTypes.string,
  addLabel: PropTypes.string,
  noDataLabel: PropTypes.string,
};

export default memo(ProductCard);
