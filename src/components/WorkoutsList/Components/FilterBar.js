import React, {useState} from 'react';

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
    <div style={{display: "flex"}}>
      {sports.map((item, index) =>
        <button
          style={{background: status[index].active ? 'greenyellow' : '', paddingRight: 50}}
          onClick={() => {
            filterSport(item);
            chooseItem(index);
          }}
          key={index}
        >{item}</button>)}
    </div>
  );
};

export default FilterBar;