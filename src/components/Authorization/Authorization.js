import React, {useContext} from 'react';
import AppContext from "../../context/AppContext";
import {dict, userLang} from "../../config/config";
import styles from './styles.module.scss'

const Authorization = () => {
  const {setAuth} = useContext(AppContext);

  const login = e => {
    e.preventDefault()
    setAuth(true);
    localStorage.setItem('auth', 'true')
  }

  return (
    <div className={'content ' + styles.page}>
      <h1>{dict.title.fakeAuth[userLang]}</h1>
      <div>
        <form onSubmit={login}>
          <div>
            <div>
              <label htmlFor="login">{dict.title.login[userLang]}</label>
              <input id={'login'} type={'text'} placeholder={dict.title.enterLogin[userLang]}/>
            </div>
           </div>
          <div>
            <div>
              <label htmlFor="password">{dict.title.password[userLang]}</label>
              <input id={'password'} type={'password'} placeholder={dict.title.enterPassword[userLang]}/>
            </div>
           </div>
          <div>
            <div className={styles.button}>
              <button>{dict.title.signIn[userLang]}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
};

export default Authorization;