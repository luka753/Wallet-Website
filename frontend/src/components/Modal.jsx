import React, { useState } from 'react'
import styles from '../styles/Modal.module.css'
import x from '../assets/X.png'
import info_circle from '../assets/info-circle.png'
import { login, signUp, } from '../api/serverApi';
import greenCheckbox from '../assets/tick-circle.png' // ro dalogindeba an daregistrirdeba green checkbox gamoachine ar dagaviwydes
import { useNavigate } from 'react-router-dom';
const Modal = ({ value, setOpen }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [logedIn, setLogedIn] = useState(null);
  const [SignUp, setSignUpSts] = useState(true);
  
  console.log(logedIn)
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
      if(!email || !password){
        setError('შეავსეთ ყველა ველი')
        return
      }
      try {
        const data = await login(email, password);
        setLogedIn(data);
      } catch (error) {
        setError('ელ–ფოსტა არ მოიძებნა');
      }
  };

  const onSignUp = async(e) => {
    e.preventDefault();
    if(!email || !password || !username){
      setError('შეავსეთ ყველა ველი')
      return
    }
    try {
      const data = await signUp(email, password, username);
      setLogedIn(data);
    } catch (error) {
      setError('ელ–ფოსტა არ მოიძებნა');
    }
  }
   const handlePlatformChange = ()=> {
    setSignUpSts(last => !last)
    setEmail('')
    setPassword('')
    setUsername('')
   }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setError('');
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setError('');
  };
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
    setError('');
  };
  
  return (
    <div className={styles.modalBackground} onClick={closeModal}>
      <div className={styles.modalContent} onClick={stopPropagation}>
        <img src={x} alt="x" className={styles.x} onClick={closeModal} />
        {SignUp ?
          <div className={styles.login}>
            <h1>შესვლა</h1>
            <p>ელ–ფოსტა</p>
            <form onSubmit={onLogin}>
              <input
                type="email"
                placeholder="Example@gmail.com"
                value={email}
                onChange={handleChangeEmail}
                // style={{ border: error ? '1px solid red' : '2px solid #5D37F3'}}
              />
              <p>პაროლი</p>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={handleChangePassword}
                // style={{ border: error ? '1px solid red' : '2px solid #5D37F3'}}
              />
              {error && <div className={styles.info}> <img src={info_circle} alt="!"  /><p className={styles.error}> {error}</p></div> }
              <div className={styles.modalButtons}>
              <button className={styles.modalButtonButton} type="submit" >შესვლა</button>
              <button style={{backgroundColor: '#a8a5b3'}} onClick={handlePlatformChange}>რეგისტრაცია</button>
              </div>
            </form>
          </div> : 
          <div className={styles.login}>
            <h1>რეგისტრაცია</h1>
              <form onSubmit={onSignUp}>
                <p>სახელი</p>
                <input
                  type="usermame"
                  value={username}
                  onChange={handleChangeUsername}
                  // style={{ border: error ? '1px solid red' : '2px solid #5D37F3'}}
                />
                <p>ელ–ფოსტა</p>
                <input
                  type="email"
                  placeholder="Example@gmail.com"
                  value={email}
                  onChange={handleChangeEmail}
                  // style={{ border: error ? '1px solid red' : '2px solid #5D37F3'}}
                />
                <p>პაროლი</p>
                <input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={handleChangePassword}
                  // style={{ border: error ? '1px solid red' : '2px solid #5D37F3'}}
                />
                {error && <div className={styles.info}> <img src={info_circle} alt="!"  /><p className={styles.error}> {error}</p></div> }
            <div className={styles.modalButtons}>
              <button className={styles.modalButtonButton} type="submit" >რეგისტრაცია</button>
              <button style={{backgroundColor: '#a8a5b3'}} onClick={handlePlatformChange}>შესვლა</button>
            </div>
            </form>
          </div>}
      </div>
    </div>
  );
};

export default Modal;