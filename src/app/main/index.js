import { memo, useCallback, useEffect, useState } from 'react';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import useLocale from '../../locale/use-locale';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import Pagination from '../../components/pagination';

const INITIAL_SKIP = 0;
const ITEMS_PER_PAGE = 10;

function Main() {
  const [offset, setOffset] = useState(INITIAL_SKIP);
  const store = useStore();
  const { translate } = useLocale();

  useEffect(() => {
    store.actions.catalog.load(ITEMS_PER_PAGE, offset);
  }, [offset]);

  const select = useSelector(state => ({
    total: state.catalog.count,
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
    // Изменение сдвига в пагинации
    setOffset: useCallback(offset => setOffset(offset), [setOffset]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title={translate('main-title')} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        limit={ITEMS_PER_PAGE}
        total={select.total}
        offset={offset}
        setOffset={callbacks.setOffset}
      />
    </PageLayout>
  );
}

export default memo(Main);
