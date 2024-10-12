import { DateTime } from 'luxon';

export default function formatDateByLocale(date, locale = 'ru') {
  if (!date) return '-';
  const dateString = DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_FULL, { locale });
  return dateString.substring(0, dateString.length - 6);
}
