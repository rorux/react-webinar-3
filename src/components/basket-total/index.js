import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useLocale from '../../locale/use-locale';
import { numberFormat } from '../../utils';
import './style.css';

function BasketTotal({ sum = 0 }) {
  const cn = bem('BasketTotal');
  const { translate } = useLocale();

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{translate('total-label')}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

export default memo(BasketTotal);
