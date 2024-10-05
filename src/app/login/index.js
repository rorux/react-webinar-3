import { memo, useCallback } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import AuthPanel from '../../containers/auth-panel';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import AuthForm from '../../components/auth-form';

/**
 * Страница авторизации
 */
function Login() {
  const { t } = useTranslate();
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
    <PageLayout>
      <AuthPanel />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <AuthForm t={t} {...select} {...callbacks} />
    </PageLayout>
  );
}

export default memo(Login);
