import { useContext } from 'react';
import { LocaleContext } from './context';

/**
 * Хук для доступа к переводу контента
 */
export default function useLocale() {
  return useContext(LocaleContext);
}
