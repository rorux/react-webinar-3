import StoreModule from '../module';

/**
 * Категории товаров
 */
class CategoriesState extends StoreModule {
  initState() {
    return {
      list: [],
      waiting: false,
    };
  }

  /**
   * Загрузка категорий
   * @return {Promise<void>}
   */
  async load() {
    this.setState({
      list: [],
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      const json = await response.json();

      const grouped = this.group(json.result.items);
      const transformed = this.transform(grouped);

      this.setState(
        {
          list: transformed,
          waiting: false,
        },
        'Загружены категории товаров из АПИ',
      );
    } catch (e) {
      this.setState({
        list: [],
        waiting: false,
      });
    }
  }

  /**
   * Группировка категорий по иерархии
   * @param cats {Array<Object>}
   * @return {Array<Object>}
   */
  group(cats) {
    const list = [...cats];
    const map = {};
    const roots = [];

    for (let i = 0; i < list.length; i += 1) {
      map[list[i]._id] = i;
      list[i].children = [];
    }

    for (let i = 0; i < list.length; i += 1) {
      const node = list[i];
      if (node.parent) {
        list[map[node.parent._id]].children.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  }

  /**
   * Приведение списка категорий к итоговому виду
   * @param cats {Array<Object>}
   * @param level {Number}
   * @return {Array<{ value: String, title: String }>}
   */
  transform(cats, level = 0) {
    const result = [];
    const prefix = '- '.repeat(level);

    cats.forEach(cat => {
      result.push({ value: cat._id, title: prefix + cat.title });
      !!cat?.children?.length && result.push(this.transform(cat.children, level + 1));
    });

    return result.flatMap(item => item);
  }
}

export default CategoriesState;
