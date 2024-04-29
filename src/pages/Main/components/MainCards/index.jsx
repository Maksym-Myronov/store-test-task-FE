import { useDispatch } from 'react-redux';
import { addToBasket } from '../../../../store/basketSlice';
// Styles
import styles from './index.module.scss';

export const MainCards = ({ id, title, items, price, count }) => {
  const dispatch = useDispatch();

  const handleAddId = (cardId) => {
    dispatch(addToBasket([{ id: cardId, title, image: items, price, count }]));
  };

  const floorNumber = Math.floor(price);

  return (
    <div className={styles.cards}>
      <img src={items} alt="photo" className={styles.cards__image} />
      <div className={styles.cards__container}>
        <p className={styles.cards__title}>{title}</p>
        <div className={styles.cards__block}>
          <p>{floorNumber}$</p>
          <button
            className={styles.cards__button}
            onClick={() => handleAddId(id)}
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};
