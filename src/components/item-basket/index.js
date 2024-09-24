import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useLocale from '../../locale/use-locale';
import { numberFormat } from '../../utils';
import './style.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const { translate } = useLocale();

  const callbacks = {
    onRemove: e => props.onRemove?.(props.item._id),
    closeModal: e => props.closeModal(),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')} onClick={callbacks.closeModal}>
        <Link to={`/product/${props.item._id}`}>{props.item.title}</Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          {numberFormat(props.item.amount || 0)} {translate('pieces-label')}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{translate('delete-label')}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: PropTypes.func,
  closeModal: PropTypes.func,
};

export default memo(ItemBasket);
