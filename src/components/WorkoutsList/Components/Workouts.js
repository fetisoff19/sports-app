import React from 'react';
import {useSelector} from "react-redux";
import ListItem from "./ListItem";
import ThreeDotsLoader from "../../Loaders/ThreeDotsLoader";

const Workouts = ({page}) => {
  const workouts = useSelector(state => state.workouts.workouts);
  const user = useSelector(state => state.user.currentUser);
  const loader = useSelector(state => state.app.appLoader);

  const list = user?.workouts?.length && workouts?.length
    ? workouts.map(item =>
      <ListItem key={Math.random()} data={item}/>)
    : null

  return (
    <>
      {list}
      {loader && page > 1 && <ThreeDotsLoader/>}
    </>
  );
};

export default Workouts;