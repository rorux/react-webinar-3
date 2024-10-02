import { memo, useCallback, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import debounce from 'lodash.debounce';

import './style.css';

function Input(props) {
  // Внутренний стейт для быстрого отображения ввода
  const [value, setValue] = useState(props.value);

  const onChangeDebounce = useCallback(
    debounce(value => props.onChange?.(value, props.name), props.delay || 0),
    [props.onChange, props.name],
  );

  // Обработчик изменений в поле
  const onChange = event => {
    setValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(props.value), [props.value]);

  const cn = bem('Input');
  return (
    <>
      {props.label && (
        <div>
          <label htmlFor={props.id}>{props.label}</label>
        </div>
      )}
      <input
        id={props.id}
        className={cn({ theme: props.theme || '' })}
        value={value}
        type={props.type || 'text'}
        placeholder={props.placeholder}
        onChange={onChange}
      />
    </>
  );
}

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.string,
};

export default memo(Input);
