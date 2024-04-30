import { Link } from 'react-router-dom';
// Styles
import styles from './index.module.scss';

export const Error = () => {
  return (
    <div className={styles.error}>
      <div className={styles.error__container}>
        <h1 className={styles.error__title}>Sorry... The page was not found</h1>
        <Link to="/">
          <button className={styles.error__button}>Back to shopping</button>
        </Link>
      </div>
    </div>
  );
};
