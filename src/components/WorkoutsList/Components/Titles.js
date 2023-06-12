import React from 'react';
import styles from "../styles.modules.scss";
import {dict, userLang} from "../../../config/config";
import Delete from "../../UI/svgComponents/Delete";
import Other from "../../UI/svgComponents/Other";

//уродливо, но работает. Придумать изящное решение
const Titles = ({status, func}) => {
  return (
    <ul>
      <li className={styles.titles}>
        <div className={styles.xsBlock + ' ' + styles.active} onClick={() => func('id', 0)}>
          {'id' + ((status[0].active ? ' \u25B4' : ' \u25BE'))}
        </div>
        <Other fill={'rgba(0,0,0,0)'}/>
        <div className={styles.sBlock + ' ' + styles.active} onClick={() => func('timestamp', 2)}>
          {dict.fields.date[userLang] + ((status[2].active ? ' \u25B4' : ' \u25BE') )}
        </div>
        <div className={styles.lBlock}>
          {dict.title.title[userLang] }
        </div>
        <div className={styles.blockMetricContainer}>
          <div className={styles.mBlock + ' ' + styles.active} onClick={() => func('totalDistance', 4)}>
            {dict.fields.totalDistance[userLang] + ((status[4].active ? ' \u25B4' : ' \u25BE') )}
          </div>
          <div className={styles.mBlock + ' ' + styles.active} onClick={() => func('totalTimerTime', 5)}>
            {dict.fields.time[userLang] + ((status[5].active ? ' \u25B4' : ' \u25BE') )}
          </div>
          <div className={styles.mBlock + ' ' + styles.active} onClick={() => func('enhancedAvgSpeed', 6)}>
            {dict.fields.avgSpeed[userLang] + ((status[6].active ? ' \u25B4' : ' \u25BE') )}
          </div>
          <div className={styles.mBlock + ' ' + styles.active} onClick={() => func('totalAscent', 7)}>
            {dict.fields.totalAscent[userLang] + ((status[7].active ? ' \u25B4' : ' \u25BE') )}
          </div>
          <div className={styles.mBlock + ' ' + styles.active} onClick={() => func('avgHeartRate', 8)}>
            {dict.fields.avgHeartRate[userLang] + ((status[8].active ? ' \u25B4' : ' \u25BE') )}
          </div>
        </div>
        <div className={styles.xsBlock}>
          <Delete fill={'rgba(0,0,0,0)'}/>
        </div>
      </li>
    </ul>
  );
};

export default Titles;