import React from 'react';

const Input = (props) => {
  return (
    <input onChange={(event) => props.setValue(event.target.value)}
           value={props.value}
           type={props.type}
           className={props.styles}
           placeholder={props.placeholder}/>
  );
};

export default Input;