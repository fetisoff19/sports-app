import React, {useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import Edit from "./svgComponents/Edit";
import Ok from "./svgComponents/Ok";
import Close from "./svgComponents/Close";
import {useDispatch} from "react-redux";
import {changeWorkout} from "../../actions/workouts";

const ChangeName = ({data, isLink, styles, setState}) => {
  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState(data.name);
  const router = useLocation();

  async function saveName() {
    if(value && value !== data.name)
    dispatch(changeWorkout(data.id, 'name', value))
  }

  const handleChange = e => setValue(e.target.value);
  const handleFocus = e => e.target.select();

  const input = (<input
    className={disabled ? (styles?.input + ' ' +  styles?.read) : (styles?.input + ' ' +  styles?.edit)}
    disabled={disabled}
    type="text"
    id={data?.id + 'input'}
    value={value}
    size={value.toString().length || 1}
    autoFocus={true}
    onChange={handleChange}
    onFocus={(e) => {
      handleFocus(e);
      setState && setState(true);
    }}
    onBlur={() => setState && setState(false)}
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