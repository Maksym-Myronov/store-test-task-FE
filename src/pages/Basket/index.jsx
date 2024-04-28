import { memo } from 'react';
import { useSelector } from 'react-redux';
import { BasketItem } from './components/BasketItem/index';
// Styles
import styles from './index.module.scss';

export const Basket = memo(() => {
  const dataFire = useSelector((state) => state.basket.basketItem);

  return (
    <div className={styles.basket}>
      <div className={dataFire.length >= 6 && styles.basket__card}>
        {dataFire?.map((data) => (
          <BasketItem
            key={data.id}
            id={data.id}
            title={data.title}
            price={data.price}
            image={data.image}
          />
        ))}
      </div>
      <div className={styles.basket__order}>
        <div>
          <input placeholder="Name" className={styles.basket__order__input} />
          <input
            placeholder="Surname"
            className={styles.basket__order__input}
          />
          <input
            placeholder="Address"
            className={styles.basket__order__input}
          />
          <input placeholder="Phone" className={styles.basket__order__input} />
        </div>
        <div className={styles.basket__order__line} />
        <p className={styles.basket__order__title}>Order Summary</p>
        <div className={styles.basket__order__blocks}>
          <p>Quantity</p>
          <p>3</p>
        </div>
        <div className={styles.basket__order__blocks}>
          <p>Total Price</p>
          <p>$152</p>
        </div>
        <div className={styles.basket__order__line} />
        <button className={styles.basket__order__payment}>Go to Payment</button>
      </div>
    </div>
  );
});
