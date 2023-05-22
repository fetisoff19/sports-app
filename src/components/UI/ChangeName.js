import React, {useContext, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {db} from "../../API/db";
import AppContext from "../../context/AppContext";
import Edit from "./svgComponents/Edit";
import Ok from "./svgComponents/Ok";
import Close from "./svgComponents/Close";

const ChangeName = ({data, isLink, styles}) => {
  const {setRandom} = useContext(AppContext);
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState(data.name);
  const router = useLocation();

  async function saveName() {
    if(value && value !== data.name)
    await db.get('workouts', data.id).then(r => {
      r.dateEdit = new Date;
      r.name = value;
      db.put('workouts', r).then(() => setRandom(Math.random()))
    })
  }

  const handleChange = e => setValue(e.target.value);
  const handleFocus = e => e.target.select();

  const input = (<input
    className={disabled ? (styles?.input + ' ' +  styles?.read) : (styles?.input + ' ' +  styles?.edit)}
    disabled={disabled}
    type="text"
    value={value}
    size={value.toString().length}
    autoFocus={true}
    onChange={handleChange}
    onFocus={handleFocus}
  />)

  return isLink ? (
      <div className={styles?.changeName}>
        {disabled
          ?
          <Link to={router.pathname + `/${data.id}`}>
            {input}
          </Link>
          : input
        }
        <div
          className={styles?.button}
          onClick={() => {
            setDisabled(prev => !prev);
            !disabled ? saveName() : null;
          }}
        >{disabled
          ? <Edit className={styles.svg} fill={'grey'} height={'18px'} width={'18px'}/>
          : <Ok className={styles.svg} fill={'grey'} height={'20px'} width={'20px'}/>}
        </div>
        <div
          className={!disabled ? styles?.button : ''}
          hidden={disabled}
          onClick={() => {
            setDisabled(true);
            setValue(data.name);
          }}>
          <Close className={styles.close} fill={'grey'} height={'20px'} width={'20px'}/>
        </div>
      </div>
  )
    :
    (
      <div className={styles?.changeName}>
        {input}
        <div
          className={styles?.button}
          onClick={() => {
            setDisabled(prev => !prev);
            !disabled ? saveName() : null;
          }}
        >{disabled
          ? <Edit className={styles?.svg} height={'18px'} width={'18px'}/>
          : <Ok className={styles?.svg} height={'20px'} width={'20px'}/>}
        </div>
        <div
          className={!disabled ? styles?.button : ''}
          hidden={disabled}
          onClick={() => {
            setDisabled(true);
            setValue(data.name);
          }}>
          <Close className={styles?.close} height={'20px'} width={'20px'}/>
        </div>
      </div>
    )
};

export default ChangeName;