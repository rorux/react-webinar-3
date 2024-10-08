import { DateTime } from 'luxon';

export default function formatDateByLocale(date, locale = 'ru-RU') {
  if (!date) return '-';

  return DateTime.fromISO(date).toFormat('DDD', { locale });
}
