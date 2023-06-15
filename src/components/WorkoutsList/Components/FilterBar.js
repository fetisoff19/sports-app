import React, {useMemo} from 'react';
import SportIcon from "../../UI/SportIcon.js";
import {dict, userLang} from "../../../config/config";
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../../../redux/actions/workouts";
import {setChosenSport} from "../../../redux/reducers/workoutsReducer";

const FilterBar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const chosenSport = useSelector(state => state.workouts.chosenSport);

  const sports = useMemo(() => {
    const set = new Set().add('all');
    user?.workouts?.forEach(workout => set.add(workout[1]))
    return set;
  }, [user]);

  function handleClick(item) {
    dispatch(setChosenSport(item))
    dispatch(getFiles(item))
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'right',
      paddingBottom: 10,
    }}>
      <div style={{display: 'flex'}}>
        {[...sports].map(item =>
          <div style={{
                 background: chosenSport === item ? 'green' : '',
                 color: chosenSport === item ? 'white' : 'green',
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
              sport={item} fill={chosenSport === item ? '#F5F5F5FF' : 'green'}/>}
          </div>)}
      </div>
    </div>
  );
};

export default FilterBar;