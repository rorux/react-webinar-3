import { memo } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import AuthPanel from '../../containers/auth-panel';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  useInit(
    () => {
      (async () => {
        await store.actions.categories.load();
        await store.actions.catalog.initParams();
      })();
    },
    [],
    true,
  );

  const { t } = useTranslate();

  return (
    <PageLayout>
      <AuthPanel />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
