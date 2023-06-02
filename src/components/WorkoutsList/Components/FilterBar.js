import React, {useState} from 'react';
import SportIcon from "../../UI/SportIcon.js";
import {dict, userLang} from "../../../config/config";

const FilterBar = ({data, filterSport}) => {
  const sports = ['all',];
  data.filter(item => sports.find(elem => elem === item.sport) ? null : sports.push(item.sport))
  const [status, setStatus] = useState(sports.map((_, index) => {return {active: !index}}));
  const chooseItem = (id) => {
    const newArr = status.map((_, i) =>
      i === id ? {active: true } : {active: false }
    );
    setStatus(newArr);
  };


  return (
    <div style={{
      display: 'flex',
      justifyContent: 'right',
      paddingBottom: 10,
    }}>
      <div style={{  display: 'flex'}}>
        {sports.map((item, index) =>
          <div style={{
                 background: status[index].active ? 'green' : '',
                 color: status[index].active ? 'white' : 'green',
                 fontSize: 16,
                 width: '70px',
                 height: '30px',
                 display: 'flex',
                 justifyContent: "space-around",
                 alignItems: 'center',
                 border: 'rgb(108, 108, 108) solid 1px',
                 borderRadius:  2,
                 cursor: 'pointer',}}
               onClick={() => {
                 filterSport(item);
                 chooseItem(index);}}
               key={index}>
            {item === 'all'
            ? dict.title.all[userLang]
            : <SportIcon
              className={'icon'} height={'20px'} width={'20px'}
              sport={item} fill={status[index].active ? '#F5F5F5FF' : 'green'}/>}
          </div>)}
      </div>

    </div>
  );
};

export default FilterBar;