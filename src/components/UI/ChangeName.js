import React, {useContext, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {db} from "../../API/db";
import AppContext from "../../context/AppContext";

const ChangeName = ({data, isLink, style}) => {
  const {setRandom} = useContext(AppContext);
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState(data.name);
  const handleChangeName = e => setValue(e.target.value);
  const router = useLocation();

  async function saveName() {
    if(value && value !== data.name)
    await db.get('workouts', data.id).then(r => {
      r.dateEdit = new Date;
      r.name = value;
      db.put('workouts', r).then(() => setRandom(Math.random()))
    })
  }

  return isLink ? (
      <div style={style}>
        {disabled
          ?
          <Link to={router.pathname + `/${data.id}`}>
            <input disabled={disabled} type="text" value={value} onChange={handleChangeName}/>
          </Link>
          : <input disabled={disabled} type="text" value={value} onChange={handleChangeName}/>
        }
        <button
          onClick={() => {
            setDisabled(prev => !prev);
            !disabled ? saveName() : null
          }}>{disabled ? 'change' : 'save'}</button>

        <button
          hidden={disabled}
          onClick={() => {
            setDisabled(true);
            setValue(data.name);
          }}>X</button>
      </div>
  )
    :
    (
      <div>
        <input disabled={disabled} type="text" value={value} onChange={handleChangeName}/>
        <button
          onClick={() => {
            setDisabled(prev => !prev);
            !disabled ? saveName() : null
          }}>{disabled ? 'change' : 'save'}</button>
        <button
          hidden={disabled}
          onClick={() => {
            setDisabled(true);
            setValue(data.name);
          }}>X</button>
      </div>
    )
};

export default ChangeName;