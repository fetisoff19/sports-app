import React from 'react';
import styles from "../styles.modules.scss";
import {dict, userLang} from "../../../config/config";
import FilterBar from "./FilterBar";
import Titles from "./Titles";

const FilterBarTitle = () => {
  return (
    <div className={styles.up}>
      <h1>
        {dict.title.activities[userLang]}
      </h1>
      <FilterBar/>
      <Titles/>
    </div>
  );
};

export default FilterBarTitle;