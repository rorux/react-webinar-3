import { memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import SideLayout from '../../components/side-layout';

function AuthPanel() {
  const store = useStore();
  const navigate = useNavigate();
  const { t } = useTranslate();

  const callbacks = {
    logOutHandler: useCallback(async () => {
      await store.actions.auth.logout();
      navigate('/login');
    }, [store]),
  };

  const select = useSelector(state => ({
    username: state.auth.username,
  }));

  return (
    <SideLayout side="end" padding="medium">
      {select.username ? (
        <SideLayout side="between">
          <Link to="/profile">{select.username}</Link>
          {'  '}
          <button onClick={callbacks.logOutHandler}>{t('exit')}</button>
        </SideLayout>
      ) : (
        <button onClick={() => navigate('/login')}>{t('enter')}</button>
      )}
    </SideLayout>
  );
}

export default memo(AuthPanel);
