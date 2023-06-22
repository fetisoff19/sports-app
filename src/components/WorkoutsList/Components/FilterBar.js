import React, {useContext, useState} from 'react';
import SportIcon from "../../UI/SportIcon.js";
import {dict, userLang} from "../../../config/config";
import {useSelector} from "react-redux";
import styles from '../styles.modules.scss'
import Input from "../../UI/Input";
import X from "../../UI/svgComponents/X";
import WorkoutsListContext from "../context/Context";


const FilterBar = () => {
  const {sport, setSport, setPage,
    setDirection, setChosenField,
    search, setSearch} = useContext(WorkoutsListContext);
  const [searchName, setSearchName] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(false);
  const sports = useSelector(state => state.workoutsList.sports);
  const loader = useSelector(state => state.app.appLoader);
  const fileLength = useSelector(state => state.workoutsList.fileLength);


  function searchChangeHandler(value) {
    setSearchName(value)
    if (searchTimeout !== false) {
      clearTimeout(searchTimeout)
    }
    if(searchName !== '') {
      setPage(1)
      setSearch(value)
      setSearchTimeout(setTimeout((value) => {
        setSearch(value)
      }, 800,value))
    } else {
      setSearch('')
    }
  }

  function stopSearch(){
    setPage(1)
    setSearch('')
    setSearchName('')
  }

  function handleClick(item) {
    setSearch('')
    setSearchName('')
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
    <div className={styles.filterBar}>
      <div className={styles.inputResult}>
        <div className={styles.searchInput}>
          <Input
            setValue={searchChangeHandler}
            value={searchName}
            id={'searchWorkoutName'}
            type="text"
            minLength="2"
            classname={''}
            placeholder={dict.title.searchWorkouts[userLang]}
          />
          {searchName && <div onClick={stopSearch}>
            <X/>
          </div>}
        </div>
        {search && !loader &&
          <span>
          {dict.title.resultSearch1[userLang] + fileLength
            + dict.title.resultSearch2[userLang] + search}
          </span>}
      </div>
      <div className={styles.sportsIcons}>
        {sports.map(item =>
          <div className={checkSport(item) ? styles.check : ''}
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