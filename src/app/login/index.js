import { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import AuthPanel from '../../components/auth-panel';
import AuthForm from '../../components/auth-form';

/**
 * Страница авторизации
 */
function Login() {
  const { t } = useTranslate();

  return (
    <PageLayout>
      <AuthPanel />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <AuthForm t={t} />
    </PageLayout>
  );
}

export default memo(Login);
