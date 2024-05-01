import { Link } from 'react-router-dom';
// Styles
import styles from './index.module.scss';

export const PurchaseSuccess = () => {
  return (
    <div className={styles.success}>
      <div className={styles.success__container}>
        <h1 className={styles.success__title}>Purchase Success!</h1>
        <p className={styles.success__text}>
          Thank’s for your order at Online shop. Your order will be processed as
          soon as possible.
          <br /> You will be receiving an email shortly with invoice from your
          order.
        </p>
        <Link to="/">
          <button className={styles.success__button}>Back to shopping</button>
        </Link>
      </div>
    </div>
  );
};
