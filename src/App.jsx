import { Routes, Route } from 'react-router-dom';
import { Main } from './pages/Main/index';
import { Basket } from './pages/Basket/index';
import { Layout } from './Layout/index';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="basket" element={<Basket />} />
      </Route>
    </Routes>
  );
}

export default App;
