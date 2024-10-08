import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CommentCard from '../comment-card';
import CommentForm from '../comment-form';
import './style.css';

function CommentsBlock(props) {
  const {
    list,
    level = 0,
    t = text => text,
    formatDate,
    sessionExists,
    loginPath,
    activeComment,
    setActiveComment,
    submitHandler,
  } = props;

  const cn = bem('CommentsBlock');

  return (
    <>
      {list.map(comment => (
        <div key={comment._id} className={cn(!level && 'firstLevel')}>
          <CommentCard
            id={comment._id}
            author={comment.author.profile.name}
            date={formatDate(comment.dateCreate)}
            text={comment.text}
            answerLabel={t('comments.answer')}
            onAnswerClick={() => setActiveComment(comment._id)}
          />
          {!!comment.children.length && (
            <CommentsBlock {...props} list={comment.children} level={level + 1} />
          )}
          {activeComment === comment._id && (
            <CommentForm
              t={t}
              sessionExists={sessionExists}
              loginPath={loginPath}
              type="answer"
              cancelHandler={() => setActiveComment(null)}
              submitHandler={submitHandler}
              id={comment._id}
            />
          )}
        </div>
      ))}
    </>
  );
}

CommentsBlock.propTypes = {
  list: PropTypes.array.isRequired,
  level: PropTypes.number,
  t: PropTypes.func,
  formatDate: PropTypes.func,
  sessionExists: PropTypes.bool,
  loginPath: PropTypes.string,
  activeComment: PropTypes.string,
  setActiveComment: PropTypes.func,
  submitHandler: PropTypes.func,
};

export default memo(CommentsBlock);
