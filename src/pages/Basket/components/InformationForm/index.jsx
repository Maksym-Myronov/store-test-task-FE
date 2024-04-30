import { useEffect, useMemo, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../../config/firebase';
import { emptyArray } from '../../../../store/basketSlice';
// Styles
import styles from '../../index.module.scss';

export const InformationForm = ({
  totalPrice,
  totalItems,
  dataFire,
  dispatch
}) => {
  const [nameInput, setNameInput] = useState(
    localStorage.getItem('nameInput') || ''
  );
  const [nameError, setNameError] = useState('');
  const [surname, setSurname] = useState(localStorage.getItem('surname') || '');
  const [surnameError, setSurnameError] = useState('');
  const [emailInput, setEmailInput] = useState(
    localStorage.getItem('emailInput') || ''
  );
  const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState(localStorage.getItem('phone') || '+380');
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    localStorage.setItem('nameInput', nameInput);
    localStorage.setItem('surname', surname);
    localStorage.setItem('emailInput', emailInput);
    localStorage.setItem('phone', phone);
  }, [nameInput, surname, emailInput, phone]);

  const storeDataCollection = useMemo(() => {
    return collection(db, 'store-basket');
  }, []);

  const handleNameInputChange = (e) => {
    const valueInputName = e.target.value.replace(/\s/g, '');
    setNameInput(valueInputName);
    if (!valueInputName.trim()) {
      setNameError('Name should not be empty');
    } else if (/\d/.test(valueInputName)) {
      setNameError('Name cannot contain numbers');
    } else {
      setNameError('');
    }
  };

  const handleSurnameInputChange = (e) => {
    const valueInputName = e.target.value.replace(/\s/g, '');
    setSurname(valueInputName);
    if (!valueInputName.trim()) {
      setSurnameError('Surname should not be empty');
    } else if (/\d/.test(valueInputName)) {
      setSurnameError('Surname cannot contain numbers');
    } else {
      setSurnameError('');
    }
  };

  const handleEmailInputChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    setEmailInput(value);
    setEmailError('');
    const emailRegex = /\S+@\S+\.\S+/;
    if (!value) {
      setEmailError('Please enter your email address');
    } else if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
    }
  };

  const handleInputChangePhone = (e) => {
    const { value } = e.target;
    let digitsOnly = value.replace(/\D/g, '');

    let formattedNumber = '+380 ';

    if (digitsOnly.startsWith('380')) {
      digitsOnly = digitsOnly.substring(3);
    }

    for (let i = 0; i < Math.min(digitsOnly.length, 9); i += 1) {
      if (i === 2 || i === 4 || i === 6) {
        formattedNumber += ' ';
      }
      formattedNumber += digitsOnly[i];
    }

    setPhone(formattedNumber);
  };

  const handleClick = async () => {
    if (
      !surname.trim() ||
      !nameInput.trim() ||
      !emailInput.trim() ||
      !phone.trim()
    ) {
      setNameError('Please enter your name');
      setSurnameError('Please enter your surname');
    } else if (/\d/.test(surname || nameInput || emailInput)) {
      setNameError('Name, surname, and email cannot contain numbers');
      setSurnameError('Name, surname, and email cannot contain numbers');
    } else if (phone.length !== 17) {
      setPhoneError('Please enter a valid phone number');
    } else {
      try {
        const dataToAdd = {
          surname,
          nameInput,
          emailInput,
          phone,
          totalPrice,
          totalItems,
          dataFire
        };

        await addDoc(storeDataCollection, dataToAdd);
      } catch (err) {
        console.error(err);
      }
      setNameInput('');
      setSurname('');
      setEmailInput('');
      setPhone('+380');
      dispatch(emptyArray());
    }
  };

  return (
    <div className={styles.basket__order}>
      <div>
        <input
          placeholder="Name"
          className={styles.basket__order__input}
          value={nameInput}
          onChange={handleNameInputChange}
        />
        {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
        <input
          placeholder="Surname"
          className={styles.basket__order__input}
          value={surname}
          onChange={handleSurnameInputChange}
        />
        {surnameError && <p style={{ color: 'red' }}>{surnameError}</p>}
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
        {phoneError && <p style={{ color: 'red' }}>{emailError}</p>}
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
      <button className={styles.basket__order__payment} onClick={handleClick}>
        Go to Payment
      </button>
    </div>
  );
};
