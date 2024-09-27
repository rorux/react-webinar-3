import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import useSelector from '../store/use-selector';
import Main from './main';
import Basket from './basket';
import Product from './product';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/list/:page" element={<Main />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="*" element={<Navigate to="/list/1" replace />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </BrowserRouter>
  );
}

export default App;
