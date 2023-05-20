import React from 'react';
import SportAndDate from "../../UI/SportAndDate";
import ChangeName from "../../UI/ChangeName.js";

const NameSportDate = ({data}) => {

  return (
    <div>
      <ChangeName data={data} isLink={false}/>
      <SportAndDate data={data}/>
    </div>
  );
};

export default React.memo(NameSportDate);