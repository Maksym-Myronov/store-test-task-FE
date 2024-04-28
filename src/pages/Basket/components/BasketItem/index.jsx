// Styles
import styles from './index.module.scss';

export const BasketItem = ({ id, title, price, image }) => {
  return (
    <div className={styles.basket__cards}>
      <img src={image} alt="image" className={styles.basket__cards__image} />
      <div className={styles.basket__cards__block}>
        <p>
          {title} <br /> <span>{price}$</span>
        </p>
        <div className={styles.basket__cards__counter}>
          <button className={styles.basket__cards__btn}>-</button>
          <p className={styles.basket__cards__count}>1</p>
          <button className={styles.basket__cards__btn}>+</button>
        </div>
      </div>
    </div>
  );
};
