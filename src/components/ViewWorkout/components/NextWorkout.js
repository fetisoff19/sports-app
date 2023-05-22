import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import AppContext from "../../../context/AppContext.js";
import Next from "../../UI/svgComponents/Next.js";
import Previous from "../../UI/svgComponents/Previous.js";

// dir ? => : <=
const NextWorkout = ({dir, id, styles}) => {
  const {workouts} = useContext(AppContext);
  let i = workouts?.findIndex(item =>
    item.id === id)
  let active = true;
  dir && i === workouts?.length - 1
    ? active = false : dir ? i++ : null;
  !dir && i === 0
    ? active = false : !dir ? i-- : null;
  i = i >= 0 && workouts ? workouts[i].id : id
  console.log(active)
  if (workouts) {
    return (
        <div className={styles?.nextWorkout}>
          {active ? <Link to={'../workouts/' + i}>
            {dir ? <Previous height={'40px'} width={'40px'}/> : <Next height={'40px'} width={'40px'}/>}
          </Link> : null}
      </div>

    )
  }
  else return <div></div>
};

export default React.memo(NextWorkout);