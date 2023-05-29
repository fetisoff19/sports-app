import React from 'react';

const NoWorkouts = ({childRef}) => {
  return (
    <div className={'content'}>
      <h1>Добавь занятия!</h1>
      <div ref={childRef} ></div>
    </div>
  );
};

export default NoWorkouts;