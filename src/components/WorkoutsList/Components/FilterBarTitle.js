import React from 'react';
import styles from "../styles.modules.scss";
import {dict, userLang} from "../../../config/config";
import FilterBar from "./FilterBar";
import Titles from "./Titles";
import {useSelector} from "react-redux";

const FilterBarTitle = () => {
  const userWorkouts = useSelector(state => state.workoutsList.userWorkouts);

  return (
    <div className={styles.up}>
      {userWorkouts.length > 0 &&
        <>
          <h1>
            {dict.title.activities[userLang]}
          </h1>
          <FilterBar/>
          <Titles/>
        </>
        }
    </div>
  );
};

export default FilterBarTitle;