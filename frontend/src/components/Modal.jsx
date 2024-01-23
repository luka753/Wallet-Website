import React, { useState } from 'react'
import styles from '../styles/Modal.module.css'
import x from '../assets/X.png'
import info_circle from '../assets/info-circle.png'
import { login, } from '../api/serverApi';
import greenCheckbox from '../assets/tick-circle.png'
import { useHeaderContext } from '../contexts/headerContexts';
import { useNavigate } from 'react-router-dom';
const Modal = ({ value, setOpen }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [logedIn, setLogedIn] = useState(null);
  const {setUser} = useHeaderContext()

  const navigate = useNavigate()
  const closeModal = () => {
    if(value === 'addBlog'){
      navigate('/')
    }
    setOpen((last) => !last);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const onLogin = async(e) => {
    e.preventDefault();

      if(email === ''){
        setError('შეავსეთ ველი')
        return
      }
      try {
        const data = await login(email);
        setUser(true);
        setLogedIn(data+ 'true')      
      } catch (error) {
        setError('ელ–ფოსტა არ მოიძებნა');
      }
      
    
    
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };
  
  return (
    <div className={styles.modalBackground} onClick={closeModal}>
      <div className={styles.modalContent} onClick={stopPropagation}>
        <img src={x} alt="x" className={styles.x} onClick={closeModal} />
       
          <div className={styles.login}>
            <h1>შესვლა</h1>
            <p>ელ–ფოსტა</p>
            <form onSubmit={onLogin}>
              <input
                type="email"
                placeholder="Example@gmail.com"
                value={email}
                onChange={handleChange}
                style={{ border: error ? '1px solid red' : '2px solid #5D37F3'}}
              />
              {error && <div className={styles.info}> <img src={info_circle} alt="!"  /><p className={styles.error}> {error}</p></div> }
              <button type="submit" >შესვლა</button>
            </form>
          </div> 
      </div>
    </div>
  );
};

export default Modal;