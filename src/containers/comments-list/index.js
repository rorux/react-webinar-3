import { memo, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector as useReduxSelector } from 'react-redux';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import commentsActions from '../../store-redux/comments/actions';
import formatDateByLocale from '../../utils/format-date-by-locale';
import commentsListToTree from '../../utils/comments-list-to-tree';
import Spinner from '../../components/spinner';
import TitleWithCount from '../../components/title-with-count';
import CommentsBlock from '../../components/comments-block';
import RootCommentForm from '../../components/root-comment-form';

const LOGIN_PATH = '/login';

function CommentsList({ articleId }) {
  const { t, lang } = useTranslate();
  const dispatch = useDispatch();

  const reduxSelect = useReduxSelector(
    state => ({
      list: state.comments.data.items,
      waiting: state.comments.waiting,
      activeComment: state.comments.activeComment,
    }),
    shallowequal,
  );

  const select = useSelector(state => ({
    exists: state.session.exists,
    username: state.session.user?.profile?.name,
  }));

  const callbacks = {
    formatDate: useCallback(date => formatDateByLocale(date, lang), [lang, formatDateByLocale]),
    setActiveComment: useCallback(
      id => {
        dispatch(commentsActions.setActive(id));
      },
      [dispatch, commentsActions],
    ),
    addComment: useCallback(
      text => {
        dispatch(commentsActions.addComment(select.username, text, articleId, 'article'));
      },
      [dispatch, select.username, commentsActions],
    ),
    addAnswer: useCallback(
      (text, commentId) => {
        dispatch(commentsActions.addComment(select.username, text, commentId, 'comment'));
      },
      [dispatch, select.username, commentsActions],
    ),
  };

  useEffect(() => {
    // закрываем форму ответа на комментарий
    return () => callbacks.setActiveComment(null);
  }, []);

  const commentsList = useMemo(() => commentsListToTree(reduxSelect.list), [reduxSelect.list]);

  return (
    <Spinner active={reduxSelect.waiting}>
      <TitleWithCount title={t('comments.title')} count={reduxSelect.list.length} />
      <CommentsBlock
        list={commentsList}
        t={t}
        formatDate={callbacks.formatDate}
        sessionExists={select.exists}
        loginPath={LOGIN_PATH}
        activeComment={reduxSelect.activeComment}
        setActiveComment={callbacks.setActiveComment}
        submitHandler={callbacks.addAnswer}
        myUsername={select.username}
      />
      {reduxSelect.activeComment === null && (
        <RootCommentForm
          t={t}
          sessionExists={select.exists}
          loginPath={LOGIN_PATH}
          type="comment"
          submitHandler={callbacks.addComment}
        />
      )}
    </Spinner>
  );
}

CommentsList.propTypes = {
  articleId: PropTypes.string,
};

export default memo(CommentsList);
