import React from 'react';
import SportAndDate from "../../UI/SportAndDate";
import ChangeName from "../../UI/ChangeName.js";

const NameSportDate = ({data, styles}) => {

  return (
    <div>
      <SportAndDate className={styles.date} data={data}/>
      <ChangeName styles={styles} data={data} isLink={false}/>
    </div>
  );
};

export default React.memo(NameSportDate);