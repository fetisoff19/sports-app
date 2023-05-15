import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import AppContext from "../../../context/AppContext.js";

// dir ? => : <=
const NextWorkout = ({name, dir, id}) => {
  const {workouts} = useContext(AppContext);
  let i = workouts?.findIndex(item =>
    item.id === id)
  let className = '';
  dir && i === workouts?.length - 1
    ? className += ' inactive' : dir ? i++ : null;
  !dir && i === 0
    ? className += ' inactive' : !dir ? i-- : null;
  i = i >= 0 && workouts ? workouts[i].id : id

  if (workouts) {
    return (
    <Link to={'../workouts/' + i}>
      <button className={className}>{name}</button>
    </Link>
    )
  }
  else return <div></div>
};

export default React.memo(NextWorkout);