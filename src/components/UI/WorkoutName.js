import React from 'react';
import {Link, useLocation} from "react-router-dom";

const WorkoutName = ({data, className}) => {
  const url = useLocation();

  const path = url.pathname.match('workouts/') ? data.id : 'workouts/' + data.id;
  return (
    <div className={className}>
      <Link to={path} >
        {data.name || null}
      </Link>
    </div>

    // <div
    //   // onClick={() => setContent(<ViewWorkout id={data.id}/>)}
    // >
    //   <div>
    //
    //   </div>
    // </div>
  );
};

export default WorkoutName;