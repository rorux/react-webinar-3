import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import ProtectedRoute from '../containers/protected-route';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path={''} element={<Main />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path={'/articles/:id'} element={<Article />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path={'/profile'} element={<Profile />} />
        </Route>
        <Route element={<ProtectedRoute secured={false} />}>
          <Route path={'/login'} element={<Login />} />
        </Route>
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
