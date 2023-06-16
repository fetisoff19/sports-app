import React from 'react';
import SportIcon from "../../UI/SportIcon.js";
import {dict, userLang} from "../../../config/config";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

const FilterBar = ({setSport, sport, setDirection, setChosenField, setPage}) => {
  const sports = useSelector(state => state.workoutsList.sports);

  function handleClick(item) {
    setPage(1)
    setSport(item)
    setDirection(-1)
    setChosenField('timestamp')
  }

  function checkSport(item){
    if(item === sport) return true
    else return !sports.includes(sport) && item === 'all';
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'right',
      paddingBottom: 10,
    }}>
      <div style={{display: 'flex'}}>
        {sports.map(item =>
          <div style={{
                 background: checkSport(item) ? 'green' : '',
                 color: checkSport(item) ? 'white' : 'green',
                 fontSize: 16,
                 width: '70px',
                 height: '30px',
                 display: 'flex',
                 justifyContent: "space-around",
                 alignItems: 'center',
                 border: 'rgb(108, 108, 108) solid 1px',
                 borderRadius:  2,
                 cursor: 'pointer',}}
               onClick={() => handleClick(item)}
               key={item}>
            {item === 'all'
            ? dict.title.all[userLang]
            : <SportIcon
              className={'icon'} height={'20px'} width={'20px'}
              sport={item} fill={checkSport(item) ? '#F5F5F5FF' : 'green'}/>}
          </div>)}
      </div>
    </div>
  );
};

export default FilterBar;