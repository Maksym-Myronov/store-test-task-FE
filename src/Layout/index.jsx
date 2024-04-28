import { Outlet } from 'react-router-dom';
import { Header } from '../pages/Header/index';

export const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
