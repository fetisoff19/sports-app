import React from 'react';
import {Link} from "react-router-dom";
import Next from "../../UI/svgComponents/Next.js";
import Previous from "../../UI/svgComponents/Previous.js";
import {useSelector} from "react-redux";

// dir ? => : <=
const NextWorkout = ({dir, _id, styles, loaded}) => {
  const workouts = useSelector(state => state.workouts.workouts)
  let i = workouts?.findIndex(item =>
    item._id === _id)
  let active = true;
  dir && i === workouts?.length - 1
    ? active = false : dir ? i++ : null;
  !dir && i === 0
    ? active = false : !dir ? i-- : null;
  i = i >= 0 && workouts ? workouts[i]._id : _id
  if (workouts) {
    return (
        <div className={styles?.nextWorkout}>
          {active && loaded ? <Link to={'../workouts/' + i} >
            {dir ? <Previous height={'40px'} width={'40px'}/> : <Next height={'40px'} width={'40px'}/>}
          </Link> : null}
      </div>

    )
  }
  else return <div></div>
};

export default React.memo(NextWorkout);