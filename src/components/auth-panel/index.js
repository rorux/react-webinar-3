import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import SideLayout from '../side-layout';

function AuthPanel() {
  const { t } = useTranslate();
  const navigate = useNavigate();

  return (
    <SideLayout side="end" padding="medium">
      <button onClick={() => navigate('/login')}>{t('enter')}</button>
    </SideLayout>
  );
}

export default memo(AuthPanel);
