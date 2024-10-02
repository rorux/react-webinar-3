import { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Input from '../input';
import Spinner from '../spinner';
import './style.css';

function AuthForm({ t = text => text }) {
  const cn = bem('AuthForm');

  const store = useStore();

  const select = useSelector(state => ({
    login: state.auth.loginInputValue,
    password: state.auth.passwordInputValue,
    error: state.auth.error,
    waiting: state.auth.waiting,
  }));

  const callbacks = {
    onSubmitForm: useCallback(() => store.actions.auth.sign(), [store]),
    onChangeLogin: useCallback(val => store.actions.auth.setLoginInput(val), [store]),
    onChangePassword: useCallback(val => store.actions.auth.setPasswordInput(val), [store]),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('login.title')}</div>
      <form
        onSubmit={e => {
          e.preventDefault();
          callbacks.onSubmitForm();
        }}
      >
        <Spinner active={select.waiting}>
          <div className={cn('row')}>
            <Input
              id="username"
              value={select.login}
              onChange={callbacks.onChangeLogin}
              placeholder={t('login.username.placeholder')}
              label={t('login.username')}
            />
          </div>
          <div className={cn('row')}>
            <Input
              id="password"
              type="password"
              value={select.password}
              onChange={callbacks.onChangePassword}
              placeholder={t('login.password.placeholder')}
              label={t('login.password')}
            />
          </div>
          <div className={cn('row', { errors: true })}>{select.error}</div>
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
};

export default memo(AuthForm);
