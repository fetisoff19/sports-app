import React, {useState} from 'react';
import {dict, userLang} from "../../config/config";
import styles from './styles.module.scss'
import {setUser} from "../../redux/reducers/userReducer";
import {useDispatch} from "react-redux";
import Input from "../UI/Input";
import {login} from "../../redux/actions/user";

const Authorization = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [request, setRequest] = useState(null)

  const dispatch = useDispatch()

  // const fakeLogin = e => {
  //   dispatch(setUser({name: 'user'}))
  //   e.preventDefault()
  // }

  return (
    <>
      <div className='authorization'>
        <div className="authorization__header">Авторизация</div>
        {request && <div>{request}</div>}
        <Input value={email} setValue={setEmail} type="text" placeholder="Введите email..."/>
        <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
        <button className="authorization__btn" onClick={() => dispatch(login(email, password, setRequest))}>Войти</button>      </div>
    {/*  <div className={'content ' + styles.page}>*/}
    {/*    <h1>{dict.title.fakeAuth[userLang]}</h1>*/}
    {/*    <div>*/}
    {/*      <form onSubmit={fakeLogin}>*/}
    {/*        <div>*/}
    {/*          <div>*/}
    {/*            <label htmlFor="login">{dict.title.login[userLang]}</label>*/}
    {/*            <input id={'login'} type={'text'} placeholder={dict.title.enterLogin[userLang]}/>*/}
    {/*          </div>*/}
    {/*        </div>*/}
    {/*        <div>*/}
    {/*          <div>*/}
    {/*            <label htmlFor="password">{dict.title.password[userLang]}</label>*/}
    {/*            <input id={'password'} type={'password'} placeholder={dict.title.enterPassword[userLang]}/>*/}
    {/*          </div>*/}
    {/*        </div>*/}
    {/*        <div>*/}
    {/*          <div className={styles.button}>*/}
    {/*            <button>{dict.title.signIn[userLang]}</button>*/}
    {/*          </div>*/}
    {/*        </div>*/}
    {/*      </form>*/}
    {/*    </div>*/}
    {/*  </div>*/}
    </>


  )
};

export default Authorization;