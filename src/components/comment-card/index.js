import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import SideLayout from '../side-layout';
import './style.css';

function CommentCard({ id, author, date, text, onAnswerClick, answerLabel, myUsername }) {
  const { pathname } = useLocation();
  const cn = bem('CommentCard');

  return (
    <div className={cn()}>
      <div className={cn('row')}>
        <SideLayout>
          <span className={cn('author', { me: myUsername === author })}>{author}</span>
          <span className={cn('date')}>{date}</span>
        </SideLayout>
      </div>
      <div className={cn('row')}>
        <div className={cn('text')}>{text}</div>
      </div>
      <div className={cn('row')}>
        <HashLink
          to={`${pathname}#${id}`}
          scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'end' })}
          className={cn('answer')}
          onClick={() => onAnswerClick()}
        >
          {answerLabel}
        </HashLink>
      </div>
    </div>
  );
}

CommentCard.propTypes = {
  id: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
  text: PropTypes.string,
  onAnswerClick: PropTypes.func,
  answerLabel: PropTypes.string,
  myUsername: PropTypes.string,
};

export default memo(CommentCard);
