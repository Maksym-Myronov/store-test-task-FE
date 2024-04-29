import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BasketItem } from './components/BasketItem/index';
import { decrementCount, incrementCount } from '../../store/basketSlice';
// Styles
import styles from './index.module.scss';

export const Basket = memo(() => {
  const dataFire = useSelector((state) => state.basket.basketItem);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [nameInput, setNameInput] = useState('');
  const [nameError, setNameError] = useState('');
  const [surname, setSurname] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState('');

  const handleEmailInputChange = (e) => {
    const value = e.target.value;
    setEmailInput(value);
    setEmailError('');

    const emailRegex = /\S+@\S+\.\S+/;
    if (!value.trim()) {
      setEmailError('Please enter your email address');
    } else if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
    }
  };

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

  const handleNameInputChange = (e) => {
    const valueInputName = e.target.value;
    setNameInput(valueInputName);
    if (!valueInputName.trim() || /\d/.test(valueInputName)) {
      setNameError('Name should not be empty or contain numbers');
    } else {
      setNameError('');
    }
  };

  const handleSurnameInputChange = (e) => {
    const valueInputName = e.target.value;
    setSurname(valueInputName);
    if (!valueInputName.trim() || /\d/.test(valueInputName)) {
      setSurnameError('Surname should not be empty or contain numbers');
    } else {
      setSurnameError('');
    }
  };

  const dispatch = useDispatch();

  const incrementCounts = (idCount) => {
    dispatch(incrementCount(idCount));
  };

  const decrementCounter = (idCount) => {
    dispatch(decrementCount(idCount));
  };

  const handleClick = () => {
    if (!surname.trim() || !nameInput.trim()) {
      setNameError('Please enter your name');
      setSurnameError('Please enter your surname');
    } else if (/\d/.test(surname || nameInput)) {
      setNameError('Name cannot contain numbers');
      setSurnameError('Surname cannot contain numbers');
    } else {
      console.log({ surname, nameInput, emailInput });
      setSurname('');
      setNameInput('');
    }
  };

  const handleInputChangePhone = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.replace(/\s/g, '');
    if (name === 'phone') {
      const cleanedValue = trimmedValue.replace(/[^0-9+]/g, '');
      setPhone(cleanedValue);
    } else {
      setInputValue(trimmedValue);
    }
  };

  return (
    <div className={styles.basket}>
      <div className={styles.basket__container}>
        <div className={dataFire.length >= 6 && styles.basket__card}>
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
        <div className={styles.basket__order}>
          <div>
            <input
              placeholder="Name"
              className={styles.basket__order__input}
              value={nameInput}
              onChange={handleNameInputChange}
            />
            {nameError && <p>{nameError}</p>}
            <input
              placeholder="Surname"
              className={styles.basket__order__input}
              value={surname}
              onChange={handleSurnameInputChange}
            />
            {surnameError && <p>{surnameError}</p>}
            <input
              placeholder="Email"
              className={styles.basket__order__input}
              value={emailInput}
              onChange={handleEmailInputChange}
            />
            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
            <input
              type="tel"
              name="phone"
              value={phone}
              placeholder="Phone number"
              onChange={handleInputChangePhone}
              className={styles.basket__order__input}
            />
          </div>
          <div className={styles.basket__order__line} />
          <p className={styles.basket__order__title}>Order Summary</p>
          <div className={styles.basket__order__blocks}>
            <p>Quantity</p>
            <p>{totalItems}</p>
          </div>
          <div className={styles.basket__order__blocks}>
            <p>Total Price</p>
            <p>${totalPrice}</p>
          </div>
          <div className={styles.basket__order__line} />
          <button
            className={styles.basket__order__payment}
            onClick={handleClick}
          >
            Go to Payment
          </button>
        </div>
      </div>
    </div>
  );
});
