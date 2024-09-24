import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const SEPARATOR = '...';

function Pagination({ limit, total, offset, setOffset }) {
  const cn = bem('Pagination');

  const currentPage = Math.floor(offset / limit) + 1;
  const lastPage = Math.ceil(total / limit);

  const callbacks = { setOffset };

  return (
    <div className={cn()}>
      {currentPage > 2 && (
        <button className={cn('item')} onClick={() => callbacks.setOffset(0)}>
          1
        </button>
      )}
      {currentPage > 3 && SEPARATOR}
      {currentPage === lastPage && (
        <button
          className={cn('item')}
          onClick={() => callbacks.setOffset((Math.ceil(total / limit) - 2) * limit)}
        >
          {lastPage - 2}
        </button>
      )}
      {currentPage - 1 > 0 && (
        <button className={cn('item')} onClick={() => callbacks.setOffset(offset - limit)}>
          {currentPage - 1}
        </button>
      )}
      <button className={cn('item', { active: true })}>{currentPage}</button>
      {currentPage + 1 <= lastPage && (
        <button className={cn('item')} onClick={() => callbacks.setOffset(offset + limit)}>
          {currentPage + 1}
        </button>
      )}
      {currentPage === 1 && (
        <button className={cn('item')} onClick={() => callbacks.setOffset(limit * 2)}>
          3
        </button>
      )}
      {currentPage < lastPage - 2 && SEPARATOR}
      {currentPage < lastPage - 1 && (
        <button
          className={cn('item')}
          onClick={() => callbacks.setOffset(Math.floor(total / limit) * limit)}
        >
          {lastPage}
        </button>
      )}
    </div>
  );
}

Pagination.propTypes = {
  limit: PropTypes.number,
  total: PropTypes.number,
  offset: PropTypes.number,
  setOffset: PropTypes.func,
};

export default memo(Pagination);
