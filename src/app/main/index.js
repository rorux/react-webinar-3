import { memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import useLocale from '../../locale/use-locale';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import Menu from '../../components/menu';
import LangSwitcher from '../../components/lang-switcher';
import Loader from '../../components/loader';

/**
 * Ссылка на список товаров с учетом пагинации
 * @param page {number} номер страницы
 */
const getPageLink = page => `/list/${page}`;

function Main() {
  const [loading, setLoading] = useState(false);
  const { page } = useParams();
  const store = useStore();
  const { translate } = useLocale();

  const currentPage = +page;

  useEffect(() => {
    (async () => {
      setLoading(true);
      await store.actions.catalog.load(currentPage);
      setLoading(false);
    })();
  }, [page]);

  const select = useSelector(state => ({
    lastPage: state.catalog.lastPage,
    list: state.catalog.list,
    basketList: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            addLabel={translate('add-label')}
            link={`/product/${item._id}`}
          />
        );
      },
      [callbacks.addToBasket, translate],
    ),
  };

  return (
    <PageLayout>
      <Head title={translate('main-title')} content={<LangSwitcher />} />
      <Menu items={[{ path: '/', label: translate('main-page') }]} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        inCartLabel={translate('in-cart')}
        oneProductLabel={translate('one-product-label')}
        fewProductsLabel={translate('few-products-label')}
        manyProductsLabel={translate('many-products-label')}
        emptyLabel={translate('empty-label')}
        goLabel={translate('go-label')}
      />
      {loading ? (
        <Loader text={translate('loading-list-label')} />
      ) : (
        <>
          <List list={select.list} renderItem={renders.item} />
          <Pagination
            currentPage={currentPage}
            lastPage={select.lastPage}
            firstPageLink={getPageLink(1)}
            thirdPageLink={getPageLink(3)}
            previousPageLink={getPageLink(currentPage - 1)}
            nextPageLink={getPageLink(currentPage + 1)}
            thirdPageFromEndLink={getPageLink(select.lastPage - 2)}
            lastPageLink={getPageLink(select.lastPage)}
          />
        </>
      )}
    </PageLayout>
  );
}

export default memo(Main);
