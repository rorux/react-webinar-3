import { memo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import SideLayout from '../side-layout';
import './style.css';

function CommentForm({
  t,
  sessionExists,
  loginPath,
  type,
  closeForm,
  submitHandler,
  id = 'new-comment',
  hasOffset,
}) {
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const cn = bem('CommentForm');

  if (!sessionExists)
    return (
      <div className={cn({ hasOffset })} id={id}>
        <div className={cn('denied')}>
          <span
            className={cn('link')}
            onClick={() => {
              navigate(loginPath, { state: { back: `${location.pathname}?comment=${id}` } });
            }}
          >
            {t('comments.logIn')}
          </span>
          {type === 'answer' ? (
            <>
              {t('comments.canAnswer')}
              <span className={cn('cancel')} onClick={closeForm}>
                {t('comments.cancel')}
              </span>
            </>
          ) : (
            <>{t('comments.canComment')}</>
          )}
        </div>
      </div>
    );

  return (
    <div className={cn({ hasOffset })} id={id}>
      <form
        onSubmit={async e => {
          e.preventDefault();
          await submitHandler?.(text.trim(), id);
          closeForm?.();
        }}
      >
        <div className={cn('row')}>
          <label className={cn('label')}>
            {type === 'answer' ? t('comments.newAnswer') : t('comments.newComment')}
          </label>
        </div>
        <div className={cn('row')}>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            className={cn('textarea')}
            rows={5}
          ></textarea>
        </div>
        <SideLayout>
          <button type="submit" disabled={!text.trim()}>
            {t('comments.send')}
          </button>
          <>{type === 'answer' && <button onClick={closeForm}>{t('comments.cancel')}</button>}</>
        </SideLayout>
      </form>
    </div>
  );
}

CommentForm.propTypes = {
  t: PropTypes.func,
  sessionExists: PropTypes.bool,
  loginPath: PropTypes.string,
  type: PropTypes.string,
  closeForm: PropTypes.func,
  submitHandler: PropTypes.func,
  id: PropTypes.string,
  hasOffset: PropTypes.bool,
};

export default memo(CommentForm);
