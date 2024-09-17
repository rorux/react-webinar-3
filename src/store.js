import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}, initCart = {}) {
    this.state = initState;
    this.cart = initCart; // Корзина товаров
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Получение списка товаров в корзине
   * @returns {Object}
   */
  getCart() {
    return this.cart;
  }

  /**
   * Изменение корзины
   * @param newCart {Object}
   */
  setCart(newCart) {
    this.cart = newCart;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   * @param item {Object}
   */
  addItemToCart(item) {
    const searchedItem = this.cart.list?.find(el => el.code === item.code);

    if (!searchedItem) {
      this.setCart({ ...this.cart, list: [...(this.cart.list || []), { ...item, count: 1 }] });
    } else {
      const changedItem = { ...searchedItem, count: (searchedItem?.count || 0) + 1 };
      this.setCart({
        ...this.cart,
        list: this.cart.list.map(el => (el.code === item.code ? changedItem : el)),
      });
    }
  }

  /**
   * Удаление товара из корзины
   * @param code {number}
   */
  removeItemFromCart(code) {
    this.setCart({ ...this.cart, list: this.cart.list?.filter(item => item.code !== code) || [] });
  }
}

export default Store;
