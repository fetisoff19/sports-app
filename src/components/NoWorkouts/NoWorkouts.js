import React from 'react';
import {dict, userLang} from "../../config/config";

const NoWorkouts = ({childRef}) => {
  return (
    <div className={'content'}>
      <h1>{dict.title.addActivities[userLang]}</h1>
      <div ref={childRef} ></div>
    </div>
  );
};

export default NoWorkouts;