// Images
import basket from '../../assets/images/Vector.svg';
// Styles
import styles from './index.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.header__title}>Clothing store</h1>
      <img src={basket} alt="basket" className={styles.header__basket} />
    </div>
  );
};
