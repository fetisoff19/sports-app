import React, {useState} from 'react';
// import './authorization.css'
import {registration} from "../../redux/actions/user";
import Input from "../UI/Input";


const Registration = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [request, setRequest] = useState(null)



  return (
    <div className='authorization'>
      <div className="authorization__header">Регистрация</div>
      {request && <div>{request}</div>}
      <Input value={email} setValue={setEmail} type="text" placeholder="Введите email..."/>
      <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
      <button className="authorization__btn" onClick={() => registration(email, password, setRequest)}>Зарегистрироваться</button>
    </div>
  );
};

export default Registration;