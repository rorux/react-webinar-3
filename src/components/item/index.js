import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

export const ItemType = PropTypes.shape({
  code: PropTypes.number,
  title: PropTypes.string,
  price: PropTypes.number,
  count: PropTypes.number,
});

function Item(props) {
  const cn = bem('Item');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{props.item.price}&nbsp;₽</div>
      {props.item.count && <div className={cn('count')}>{props.item.count}&nbsp;шт</div>}
      <div className={cn('actions')}>{props.button}</div>
    </div>
  );
}

Item.propTypes = {
  item: ItemType.isRequired,
  button: PropTypes.node.isRequired,
};

export default React.memo(Item);
