const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

/**
 * Корректное отображение количества
 * @param count {number}
 * @returns {string}
 */
export const countStringify = count => {
  const lastTwoDigits = count % 100;
  if (lastTwoDigits > 11 && lastTwoDigits < 15) return 'раз';

  const lastDigit = count % 10;
  return lastDigit > 1 && lastDigit < 5 ? 'раза' : 'раз';
};
