import React from 'react';

const Input = (props) => {
  return (
    <input onChange={e => props.setValue(e.target.value)}
           value={props.value}
           type={props.type}
           className={props.styles}
           id={props.id}
           minLength={props.minLength}
           placeholder={props.placeholder}/>
  );
};

export default Input;