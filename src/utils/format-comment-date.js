import { DateTime } from 'luxon';

export default function formatCommentDate(date, locale = 'ru') {
  if (!date) return '-';
  const dateString = DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_FULL, { locale });
  const withoutTimezone = dateString.substring(0, dateString.length - 6);

  return locale === 'ru' ? withoutTimezone.replace('г. ', '') : withoutTimezone;
}
