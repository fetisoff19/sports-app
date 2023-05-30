import React, {useContext} from 'react';
import AppContext from "../context/AppContext.js";

const Login = () => {
  const {setAuth} = useContext(AppContext);

  const login = e => {
    e.preventDefault()
    setAuth(true);
    localStorage.setItem('auth', 'true')
  }

  return (
    <div className={'content'}>
      <h1>Авторизация</h1>
      <form onSubmit={login}>
        <input type={'text'} placeholder={'Enter a login'}/>
        <input type={'password'} placeholder={'Enter a password'}/>
        <button>Войти</button>
      </form>
    </div>
    )
};

export default Login;