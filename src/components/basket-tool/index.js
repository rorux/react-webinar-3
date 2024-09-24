import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useLocale from '../../locale/use-locale';
import { numberFormat, plural } from '../../utils';
import './style.css';

function BasketTool({ sum = 0, amount = 0, onOpen = () => {} }) {
  const cn = bem('BasketTool');
  const { translate } = useLocale();

  return (
    <div className={cn()}>
      <span className={cn('content')}>
        <Link to="/">{translate('main-page')}</Link>
      </span>
      <span className={cn('label')}>{translate('in-cart')}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
              one: translate('one-product-label'),
              few: translate('few-products-label'),
              many: translate('many-products-label'),
            })} / ${numberFormat(sum)} ₽`
          : translate('empty-label')}
      </span>
      <button onClick={onOpen}>{translate('go-label')}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

export default memo(BasketTool);
