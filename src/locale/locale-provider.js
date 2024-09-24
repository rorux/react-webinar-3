import { useState } from 'react';
import PropTypes from 'prop-types';
import { LocaleContext } from './context';
import * as languages from './exports.js';

const languagesList = {
  ru: 'ru',
  en: 'en',
};

function LocaleProvider({ children }) {
  const [language, setLanguage] = useState(languagesList.ru);

  const translate = key => languages[language][key];

  return (
    <LocaleContext.Provider
      value={{ currentLanguage: language, setLanguage, languagesList, translate }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

LocaleProvider.propTypes = {
  children: PropTypes.node,
};

export default LocaleProvider;
