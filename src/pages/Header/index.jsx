import { Link } from 'react-router-dom';
// Images
import basket from '../../assets/images/Vector.svg';
// Styles
import styles from './index.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <Link to="/">
        <h1 className={styles.header__title}>Online store</h1>
      </Link>
      <Link to="/basket">
        <img src={basket} alt="basket" className={styles.header__basket} />
      </Link>
    </div>
  );
};
