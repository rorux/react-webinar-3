import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Item, { ItemType } from '../item';
import './style.css';

function List({ list, addItemToCart }) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {list.map(item => (
        <div key={item.code} className={cn('item')}>
          <Item
            item={item}
            button={
              <button className="action-btn" onClick={() => addItemToCart(item)}>
                Добавить
              </button>
            }
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(ItemType).isRequired,
  addItemToCart: PropTypes.func.isRequired,
};

export default React.memo(List);
