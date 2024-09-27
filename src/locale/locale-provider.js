import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LocaleContext } from './context';
import * as languages from './exports.js';

const languagesList = {
  ru: 'ru',
  en: 'en',
};

function LocaleProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem('locale') || languagesList.ru);

  const translate = key => languages[lang][key] || key;

  const setLanguage = lang => {
    localStorage.setItem('locale', lang);
    setLang(lang);
  };

  return (
    <LocaleContext.Provider
      value={{ currentLanguage: lang, setLanguage, languagesList, translate }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

LocaleProvider.propTypes = {
  children: PropTypes.node,
};

export default LocaleProvider;
