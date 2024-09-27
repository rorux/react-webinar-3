import { codeGenerator } from '../../utils';
import StoreModule from '../module';

const ITEMS_PER_PAGE = 10;

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      limit: ITEMS_PER_PAGE,
      lastPage: 0,
    };
  }

  /**
   * Загрузка списка товаров с пагинацией
   * @param page {number} номер страницы
   */
  async load(page) {
    try {
      const limit = this.getState().limit;
      const skip = (page - 1) * limit;

      const response = await fetch(
        `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`,
      );
      const json = await response.json();
      const list = json.result.items;
      const totalCount = json.result.count;
      const lastPage = Math.ceil(totalCount / limit);

      this.setState(
        {
          ...this.getState(),
          list,
          lastPage,
        },
        'Загружены товары из АПИ',
      );
    } catch (_) {
      console.log('Ошибка загрузки товаров!');
    }
  }
}

export default Catalog;
