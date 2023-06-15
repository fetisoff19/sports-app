import React from 'react';
import {useSelector} from "react-redux";
import ListItem from "./ListItem";
import NoWorkouts from "../../NoWorkouts/NoWorkouts";

const Workouts = () => {
  const workouts = useSelector(state => state.workouts.workouts);
  const user = useSelector(state => state.user.currentUser);

  const list = user?.workouts?.length && workouts?.length
    ? workouts.map(item =>
      <ListItem key={item.name} data={item}/>)
    : <NoWorkouts/>
  return (
    <>
      {list}
    </>
  );
};

export default Workouts;