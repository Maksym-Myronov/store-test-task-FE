import { Link } from 'react-router-dom';
// Styles
import styles from './index.module.scss';

export const EmptyBasket = () => {
  return (
    <div className={styles.empty}>
      <div>
        <h1 className={styles.empty__title}>Your Cart is Empty</h1>
        <p className={styles.empty__text}>
          Unfortunately, your cart is currently empty.
          <br /> You can browse our products and add your favorites to the cart
          for easy checkout.
          <br /> Head to our catalog and start shopping now!
        </p>
        <Link to="/">
          <button className={styles.empty__button}>Back to shopping</button>
        </Link>
      </div>
    </div>
  );
};
