import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CommentForm from '../comment-form';
import './style.css';

function RootCommentForm(props) {
  const cn = bem('RootCommentForm');

  return (
    <div className={cn()}>
      <CommentForm {...props} />
    </div>
  );
}

RootCommentForm.propTypes = {
  t: PropTypes.func,
  sessionExists: PropTypes.bool,
  loginPath: PropTypes.string,
  type: PropTypes.string,
};

export default memo(RootCommentForm);
