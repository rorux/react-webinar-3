import { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Input from '../input';
import './style.css';

function AuthForm({ t = text => text }) {
  const cn = bem('AuthForm');

  const store = useStore();

  const select = useSelector(state => ({
    login: state.user.loginInputValue,
    password: state.user.passwordInputValue,
    error: state.user.error,
    waiting: state.user.waiting,
  }));

  const callbacks = {
    onSubmitForm: useCallback(() => store.actions.user.sign(), [store]),
    onChangeLogin: useCallback(val => store.actions.user.setLoginInput(val), [store]),
    onChangePassword: useCallback(val => store.actions.user.setPasswordInput(val), [store]),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('enter')}</div>
      <form
        onSubmit={e => {
          e.preventDefault();
          callbacks.onSubmitForm();
        }}
      >
        <div className={cn('row')}>
          <Input
            id="username"
            value={select.login}
            onChange={callbacks.onChangeLogin}
            placeholder={t('username.placeholder')}
            label={t('username')}
          />
        </div>
        <div className={cn('row')}>
          <Input
            id="password"
            value={select.password}
            onChange={callbacks.onChangePassword}
            placeholder={t('password.placeholder')}
            label={t('password')}
          />
        </div>
        <div className={cn('row', { errors: true })}>{select.error}</div>
        <div className={cn('row')}>
          <button type="submit">{t('getIn')}</button>
        </div>
      </form>
    </div>
  );
}

AuthForm.propTypes = {
  t: PropTypes.func,
};

export default memo(AuthForm);
