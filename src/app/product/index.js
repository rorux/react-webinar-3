import { memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useLocale from '../../locale/use-locale';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import PageLayout from '../../components/page-layout';
import ProductCard from '../../components/product-card';
import Menu from '../../components/menu';
import LangSwitcher from '../../components/lang-switcher';
import Loader from '../../components/loader';

function Product() {
  const [loading, setLoading] = useState(false);
  const store = useStore();
  const { id } = useParams();
  const { translate } = useLocale();

  useEffect(() => {
    (async () => {
      setLoading(true);
      await store.actions.product.load(id);
      setLoading(false);
    })();
  }, [id]);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.product,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <PageLayout>
      <Head title={select.product.title} content={<LangSwitcher />} />
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
        <Loader text={translate('loading-product-label')} />
      ) : (
        <ProductCard
          product={select.product}
          onAdd={callbacks.addToBasket}
          vendorLabel={translate('vendor-label')}
          categoryLabel={translate('category-label')}
          yearLabel={translate('year-label')}
          priceLabel={translate('price-label')}
          addLabel={translate('add-label')}
          noDataLabel={translate('no-data-label')}
        />
      )}
    </PageLayout>
  );
}

export default memo(Product);
