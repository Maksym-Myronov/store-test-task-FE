import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCardsFromApi } from '../../store/cardSlice';
import { MainCards } from './components/MainCards/index';
// Styles
import styles from './index.module.scss';

export const Main = () => {
  const itemFromApi = useSelector((state) => state.cards.cards);

  const getFirstTenItemsFromArray = itemFromApi?.slice(0, 14);
  console.log(itemFromApi);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCardsFromApi());
  }, [dispatch]);

  return (
    <div className={styles.cards}>
      <div className={styles.cards__container}>
        {getFirstTenItemsFromArray?.map((item) => (
          <MainCards
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            items={item.image}
            count={item.count}
          />
        ))}
      </div>
    </div>
  );
};
