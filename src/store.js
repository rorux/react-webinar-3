/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.maxId = this.state?.list?.length || 0;
  }

  /**
   * Максимальное значение id
   * @returns {number}
   */
  getMaxId() {
    return this.maxId;
  }

  /**
   * Установка максимального значения id
   */
  setMaxId() {
    this.maxId += 1;
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
   * Добавление новой записи
   */
  addItem() {
    this.setMaxId();
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: this.getMaxId(), selectionsCount: 0, title: 'Новая запись' },
      ],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        item.selected = item.code === code ? !item.selected : false;
        if (item.code === code && item.selected) item.selectionsCount += 1;
        return item;
      }),
    });
  }
}

export default Store;
