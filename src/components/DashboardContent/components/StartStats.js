import React from 'react';
import {dict, userLang} from "../../../config/config";
import {useSelector} from "react-redux";

const StartStats = () => {
  // const workouts = useSelector(state => state.workouts.workouts)
  return (
      <div style={{fontWeight: 100, fontStyle: 'italic', whiteSpace: "pre-wrap"}}>
        {dict.title.inDeveloping[userLang]}
      </div>

  );
};

export default StartStats;