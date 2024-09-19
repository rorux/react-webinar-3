import React, { useState } from 'react';
import List from './components/list';
import Cart from './components/cart';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ListItem from './components/list-item';
import CartModal from './components/cart-modal';
import Modal from './components/modal';
import './style.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [openedModal, setOpenedModal] = useState(false);
  const list = store.getState().list;
  const { totalSum, list: cartList } = store.getState().cart;

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Cart store={store} openModal={() => setOpenedModal(true)} />
      <List list={list} component={<ListItem store={store} />} />
      <Modal title="Корзина" opened={openedModal} onClose={() => setOpenedModal(false)}>
        <CartModal store={store} totalSum={totalSum} cartList={cartList} />
      </Modal>
    </PageLayout>
  );
}

export default App;
