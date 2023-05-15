import React from 'react';
import ViewWorkout from "../ViewWorkout/ViewWorkout";
import {Link, useLocation, useParams} from "react-router-dom";

const WorkoutName = ({data}) => {
  const url = useLocation();

  const path = url.pathname.match('workouts/') ? data.id : 'workouts/' + data.id;
  return (
    <Link to={path}>
      {data.name || null}
    </Link>
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