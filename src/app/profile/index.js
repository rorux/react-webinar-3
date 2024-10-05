import { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import AuthPanel from '../../containers/auth-panel';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import ProfileCard from '../../components/profile-card';
import Spinner from '../../components/spinner';

/**
 * Страница профиля
 */
function Profile() {
  const { t } = useTranslate();
  const store = useStore();

  useInit(() => {
    store.actions.user.getProfile();
  }, []);

  const select = useSelector(state => ({
    profile: state.user.data,
    waiting: state.user.waiting,
  }));

  return (
    <PageLayout>
      <AuthPanel />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileCard profile={select.profile} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
