import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Images
import basket from '../../assets/images/Vector.svg';
// Styles
import styles from './index.module.scss';

export const Header = () => {
  const dataFire = useSelector((state) => state.basket.basketItem);
  const [totalItems, setTotalItems] = useState(null);

  useEffect(() => {
    if (dataFire) {
      const countTotalPrice = dataFire.reduce(
        (acc, item) => acc + Math.floor(item.priceTotal),
        0
      );
      setTotalItems(countTotalPrice);
    }
    console.log(dataFire);
  }, [dataFire]);

  const showTotalPrice = totalItems !== 0 && `$${totalItems}`;

  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/">
          <h1 className={styles.header__title}>Online store</h1>
        </Link>
        <Link to="/basket" className={styles.header__link}>
          <img src={basket} alt="basket" className={styles.header__basket} />
          <p>{showTotalPrice}</p>
        </Link>
      </div>
    </div>
  );
};
