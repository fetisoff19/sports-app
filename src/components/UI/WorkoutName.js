import React from 'react';
import {Link, useLocation} from "react-router-dom";

const WorkoutName = ({data, className}) => {
  const url = useLocation();

  const path = url.pathname.match('workouts/') ? data._id : 'workouts/' + data._id;
  return (
    <div className={className}>
      <Link to={path} >
        {data.workoutName}
      </Link>
    </div>
  );
};

export default React.memo(WorkoutName);