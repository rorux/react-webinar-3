import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileCard({ t = text => text, profile }) {
  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('profile.title')}</div>
      <div className={cn('row')}>
        {t('profile.name')}: <strong>{profile?.name || '-'}</strong>
      </div>
      <div className={cn('row')}>
        {t('profile.phone')}: <strong>{profile?.phone || '-'}</strong>
      </div>
      <div className={cn('row')}>
        {t('profile.email')}: <strong>{profile?.email || '-'}</strong>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    username: PropTypes.string,
  }),
  t: PropTypes.func,
};

export default memo(ProfileCard);
