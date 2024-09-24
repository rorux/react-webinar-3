import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useLocale from '../../locale/use-locale';
import './style.css';

function ProductCard({ _id, description, vendor, category, year, price, onAdd }) {
  const cn = bem('ProductCard');
  const { translate } = useLocale();

  const callbacks = {
    onAdd: e => onAdd?.(_id),
  };

  return (
    <div className={cn()}>
      <div className={cn('description')}>{description}</div>
      <div className={cn('vendor')}>
        {translate('vendor-label')}: <strong>{vendor}</strong>
      </div>
      <div className={cn('category')}>
        {translate('category-label')}: <strong>{category}</strong>
      </div>
      <div className={cn('year')}>
        {translate('year-label')}: <strong>{year}</strong>
      </div>
      <div className={cn('price')}>
        {translate('price-label')}: <strong>{price} ₽</strong>
      </div>
      <div className={cn('action')}>
        <button onClick={callbacks.onAdd}>{translate('add-label')}</button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  _id: PropTypes.string,
  description: PropTypes.string,
  vendor: PropTypes.string,
  category: PropTypes.string,
  year: PropTypes.number,
  price: PropTypes.number,
  onAdd: PropTypes.func,
};

export default memo(ProductCard);
