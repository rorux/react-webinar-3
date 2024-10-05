import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Input from '../input';
import Spinner from '../spinner';
import './style.css';

function AuthForm({
  t = text => text,
  login = '',
  password = '',
  error = '',
  waiting = false,
  onSubmitForm,
  onChangeLogin,
  onChangePassword,
}) {
  const cn = bem('AuthForm');
  const navigate = useNavigate();

  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('login.title')}</div>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmitForm();
        }}
      >
        <Spinner active={waiting}>
          <div className={cn('row')}>
            <Input
              id="username"
              value={login}
              onChange={onChangeLogin}
              placeholder={t('login.username.placeholder')}
              label={t('login.username')}
            />
          </div>
          <div className={cn('row')}>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={onChangePassword}
              placeholder={t('login.password.placeholder')}
              label={t('login.password')}
            />
          </div>
          <div className={cn('row', { errors: true })}>{error}</div>
          <div className={cn('row')}>
            <button type="submit">{t('getIn')}</button>
          </div>
        </Spinner>
      </form>
    </div>
  );
}

AuthForm.propTypes = {
  t: PropTypes.func,
  login: PropTypes.string,
  password: PropTypes.string,
  error: PropTypes.string,
  waiting: PropTypes.bool,
  onSubmitForm: PropTypes.func,
  onChangeLogin: PropTypes.func,
  onChangePassword: PropTypes.func,
};

export default memo(AuthForm);
