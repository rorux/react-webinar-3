import { memo, useCallback, useEffect } from 'react';
import { Outlet, useNavigate, Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';

function ProtectedRoute({ secured = true }) {
  const { t } = useTranslate();
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  useInit(() => {
    store.actions.user.getProfile();
  }, [location]);

  const select = useSelector(state => ({
    profile: state.user.data,
    error: state.user.error,
    waiting: state.user.waiting,
    username: state.auth.username,
    authed: state.auth.authed,
  }));

  const callbacks = {
    setUsername: useCallback(username => store.actions.auth.setUsername(username), [store]),
    logOutHandler: useCallback(async () => {
      await store.actions.auth.logout();
      navigate('/login');
    }, [store]),
  };

  useEffect(() => {
    if (select.profile.username) callbacks.setUsername(select.profile.username);
  }, [select.profile.username]);

  useEffect(() => {
    if (select.error) {
      callbacks.logOutHandler();
    }
  }, [select.error]);

  if (select.authed === null) return <>{t('loading')}</>;

  if (secured) {
    return select.authed ? <Outlet /> : <Navigate to="/login" />;
  } else {
    return select.authed ? <Navigate to="/profile" /> : <Outlet />;
  }
}

ProtectedRoute.propTypes = {
  secured: PropTypes.bool,
};

export default memo(ProtectedRoute);
