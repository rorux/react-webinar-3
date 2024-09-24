import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
    };
  }

  /**
   * Загрузка списка товаров с пагинацией
   * @param limit {number} количество на страницу
   * @param offset {number} сдвиг
   */
  async load(limit = 10, offset = 0) {
    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${offset}&fields=items(_id, title, price),count`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
      },
      'Загружены товары из АПИ',
    );
  }
}

export default Catalog;
