import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const SEPARATOR = '...';

function Pagination({
  currentPage,
  lastPage,
  firstPageLink,
  thirdPageLink,
  previousPageLink,
  nextPageLink,
  thirdPageFromEndLink,
  lastPageLink,
}) {
  const cn = bem('Pagination');
  const navigate = useNavigate();

  return (
    <div className={cn()}>
      {currentPage > 2 && (
        <button className={cn('item')} onClick={() => navigate(firstPageLink)}>
          1
        </button>
      )}
      {currentPage > 3 && SEPARATOR}
      {currentPage === lastPage && (
        <button className={cn('item')} onClick={() => navigate(thirdPageFromEndLink)}>
          {lastPage - 2}
        </button>
      )}
      {currentPage - 1 > 0 && (
        <button className={cn('item')} onClick={() => navigate(previousPageLink)}>
          {currentPage - 1}
        </button>
      )}
      <button className={cn('item', { active: true })}>{currentPage}</button>
      {currentPage + 1 <= lastPage && (
        <button className={cn('item')} onClick={() => navigate(nextPageLink)}>
          {currentPage + 1}
        </button>
      )}
      {currentPage === 1 && (
        <button className={cn('item')} onClick={() => navigate(thirdPageLink)}>
          3
        </button>
      )}
      {currentPage < lastPage - 2 && SEPARATOR}
      {currentPage < lastPage - 1 && (
        <button className={cn('item')} onClick={() => navigate(lastPageLink)}>
          {lastPage}
        </button>
      )}
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  lastPage: PropTypes.number,
  firstPageLink: PropTypes.string,
  thirdPageLink: PropTypes.string,
  previousPageLink: PropTypes.string,
  nextPageLink: PropTypes.string,
  thirdPageFromEndLink: PropTypes.string,
  lastPageLink: PropTypes.string,
};

export default memo(Pagination);
