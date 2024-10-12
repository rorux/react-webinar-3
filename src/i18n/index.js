import translate from './translate';

/**
 * Интернационализация
 */
class I18n {
  /**
   * @param services {Services}
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.lang = localStorage.getItem('lang') || config.defaultLang || 'ru';
    this.listeners = [];

    this.services.api.defaultHeaders = {
      ...this.services.api.defaultHeaders,
      'Accept-Language': this.lang,
    };
  }

  getLang() {
    return this.lang;
  }

  setLang(lang) {
    this.lang = lang;
    localStorage.setItem('lang', lang);

    for (const listener of this.listeners) listener(this.lang);

    this.services.api.defaultHeaders = {
      ...this.services.api.defaultHeaders,
      'Accept-Language': lang,
    };
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  translate(text, number) {
    return translate(this.lang, text, number);
  }
}

export default I18n;
