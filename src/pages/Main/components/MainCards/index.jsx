// Styles
import styles from './index.module.scss';
import secondVector from '../../../../assets/images/Group 58.svg';

export const MainCards = ({ id, title, items, price }) => {
  const firstImageFromArray = items[0];

  const handleAddId = (cardId) => {
    console.log({ cardId, title, items, price });
  };

  return (
    <div className={styles.cards}>
      <div>
        <img
          src={firstImageFromArray}
          alt="photo"
          className={styles.cards__image}
        />
        <div className={styles.cards__container}>
          <p className={styles.cards__title}>{title}</p>
          <div className={styles.cards__block}>
            <p>{price}$</p>
            <button
              className={styles.cards__button}
              onClick={() => handleAddId(id)}
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
