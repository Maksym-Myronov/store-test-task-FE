// Styles
import styles from './index.module.scss';

export const BasketItem = ({
  id,
  title,
  priceTotal,
  image,
  count,
  incrementCounts,
  decrementCounter
}) => {
  const floorNumber = Math.floor(priceTotal);

  return (
    <div className={styles.basket__cards}>
      <div className={styles.basket__cards__photo}>
        <img src={image} alt="image" className={styles.basket__cards__image} />
      </div>
      <div className={styles.basket__cards__block}>
        <p className={styles.basket__cards__text}>
          {title} <br />{' '}
        </p>
        <span className={styles.basket__cards__price}>{floorNumber}$</span>
        <div className={styles.basket__cards__counter}>
          <button
            className={styles.basket__cards__btn}
            onClick={() => decrementCounter(id)}
          >
            -
          </button>
          <p className={styles.basket__cards__count}>{count}</p>
          <button
            className={styles.basket__cards__btn}
            onClick={() => incrementCounts(id)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
