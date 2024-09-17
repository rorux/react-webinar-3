import React, { useCallback } from 'react';
import List from './components/list';
import Cart from './components/cart';
import Head from './components/head';
import PageLayout from './components/page-layout';
import './style.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list || [];
  const cartList = store.getCart().list || [];

  const callbacks = {
    removeItemFromCart: useCallback(
      code => {
        store.removeItemFromCart(code);
      },
      [store],
    ),

    addItemToCart: useCallback(
      item => {
        store.addItemToCart(item);
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Cart cartList={cartList} removeItemFromCart={callbacks.removeItemFromCart} />
      <List list={list} addItemToCart={callbacks.addItemToCart} />
    </PageLayout>
  );
}

export default App;
