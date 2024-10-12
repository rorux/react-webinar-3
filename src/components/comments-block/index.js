import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CommentCard from '../comment-card';
import CommentForm from '../comment-form';
import './style.css';

const MAX_LEVEL_WITH_OFFSET = 16;

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
    myUsername,
  } = props;

  const cn = bem('CommentsBlock');

  const hasOffset = level < MAX_LEVEL_WITH_OFFSET;

  return (
    <>
      {list.map(comment => (
        <div key={comment._id} className={cn(!level ? 'firstLevel' : hasOffset ? 'offset' : '')}>
          <CommentCard
            id={comment._id}
            author={comment.author.profile.name}
            date={formatDate(comment.dateCreate)}
            text={comment.text}
            answerLabel={t('comments.answer')}
            onAnswerClick={() => setActiveComment(comment._id)}
            myUsername={myUsername}
          />
          {!!comment.children.length && (
            <CommentsBlock
              {...props}
              list={comment.children}
              level={hasOffset ? level + 1 : MAX_LEVEL_WITH_OFFSET}
            />
          )}
          {activeComment === comment._id && (
            <CommentForm
              t={t}
              sessionExists={sessionExists}
              loginPath={loginPath}
              type="answer"
              closeForm={() => setActiveComment(null)}
              submitHandler={submitHandler}
              id={comment._id}
              hasOffset={hasOffset}
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
  myUsername: PropTypes.string,
};

export default memo(CommentsBlock);
