import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BasketItem } from './components/BasketItem/index';
import { decrementCount, incrementCount } from '../../store/basketSlice';
import { InformationForm } from './components/InformationForm/index';
// Styles
import styles from './index.module.scss';

export const Basket = memo(() => {
  const dataFire = useSelector((state) => state.basket.basketItem);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (dataFire) {
      const countTotalPrice = dataFire.reduce(
        (acc, item) => acc + Math.floor(item.priceTotal),
        0
      );
      setTotalPrice(countTotalPrice);
      const countItems = dataFire.reduce((acc, item) => acc + item.count, 0);
      setTotalItems(countItems);
    }
    console.log(dataFire);
  }, [dataFire]);

  const incrementCounts = (idCount) => {
    dispatch(incrementCount(idCount));
  };

  const decrementCounter = (idCount) => {
    dispatch(decrementCount(idCount));
  };

  return (
    <div className={styles.basket}>
      <div className={styles.basket__container}>
        <div className={dataFire.length >= 6 ? styles.basket__card : undefined}>
          {dataFire?.map((data) => (
            <BasketItem
              key={data.id}
              id={data.id}
              title={data.title}
              image={data.image}
              count={data.count}
              priceTotal={data.priceTotal}
              incrementCounts={incrementCounts}
              decrementCounter={decrementCounter}
            />
          ))}
        </div>
        <InformationForm
          totalPrice={totalPrice}
          totalItems={totalItems}
          dataFire={dataFire}
          dispatch={dispatch}
        />
      </div>
    </div>
  );
});
