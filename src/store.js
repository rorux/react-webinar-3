/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = { list: [] }, initCart = { list: [], totalSum: 0, totalCount: 0 }) {
    this.state = { ...initState, cart: initCart };
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
   * Добавление товара в корзину
   * @param code {number}
   */
  addItemToCart(code) {
    const searchedItem = this.state.cart.list?.find(el => code === el.code);
    const item = this.state.list.find(el => code === el.code);

    let newCartList;
    if (!searchedItem) {
      newCartList = [...this.state.cart.list, { ...item, count: 1 }];
    } else {
      const changedItem = { ...searchedItem, count: (searchedItem?.count || 0) + 1 };
      newCartList = this.state.cart.list.map(el => (el.code === item.code ? changedItem : el));
    }

    this.setState({
      ...this.state,
      cart: this.transformCart(newCartList),
    });
  }

  /**
   * Удаление товара из корзины
   * @param code {number}
   */
  removeItemFromCart(code) {
    const newCartList = this.state.cart.list.filter(item => item.code !== code) || [];

    this.setState({
      ...this.state,
      cart: this.transformCart(newCartList),
    });
  }

  /**
   * Вычисление общей суммы в корзине
   * @param cartList {Array<Object>}
   */
  getCartTotalSum(cartList) {
    return cartList.reduce((acc, item) => acc + item.count * item.price, 0);
  }

  /**
   * Вычисление количества товаров в корзине
   * @param cartList {Array<Object>}
   */
  getCartTotalCount(cartList) {
    return cartList.length;
  }

  /**
   * Изменение объекта корзины
   * @param cartList {Array<Object>}
   */
  transformCart(cartList) {
    return {
      list: cartList,
      totalSum: this.getCartTotalSum(cartList),
      totalCount: this.getCartTotalCount(cartList),
    };
  }
}

export default Store;
