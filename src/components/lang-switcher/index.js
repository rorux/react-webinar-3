import { memo } from 'react';
import useLocale from '../../locale/use-locale';

function LangSwitcher() {
  const { currentLanguage, setLanguage, languagesList, translate } = useLocale();

  return (
    <select onChange={e => setLanguage(e.target.value)} defaultValue={currentLanguage}>
      <option value={languagesList.ru}>{translate('russian')}</option>
      <option value={languagesList.en}>{translate('english')}</option>
    </select>
  );
}

export default memo(LangSwitcher);
