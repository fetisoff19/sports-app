import React from 'react';
import {getHourMinSec, getMinSec} from "../../../../../API/functionsDate&Values.js";
import {dict, userLang, chartsConfig} from "../../../../../config/config.js";
import {useContext} from "react";
import ViewWorkoutContext from "../../../context/Context.js";
import styles from "../../../styles.module.scss";

const RefreshValuesFromCharts = ({chartsNames}) => {
  const {dataForCharts, index} = useContext(ViewWorkoutContext)

  let data = dataForCharts?.charts;
  let timeArray = dataForCharts?.timeArray;
  let validate = index <= timeArray.length;

  let tbody = chartsNames.map(item => {
    let value = '';
    let validateData = data[item]?.data[index] && validate ? data[item]?.data[index][1] : null
    Number.isInteger(index) && item === 'pace' && validateData
      ? value = getMinSec(validateData)
      : Number.isInteger(index) && validateData
        ? value = validateData.toString().replaceAll('.', ',')
          : '';

    return (
      <td
        style={{color: chartsConfig[item].themeColor, minWidth: 65}}
        key={item}>
        {value || '--'}
      </td>)
    }
  )

  tbody.push(
    <td key={'distance'} style={{color: 'orange', minWidth: 75}}>
      {Number.isInteger(index) && chartsNames[0] && data[chartsNames[0]] && validate
        ? data[chartsNames[0]]?.data[index][0].toString().replaceAll('.', ',')
        : '--'}
    </td>,
    <td key={'time'} style={{color: 'gray', minWidth: 85}}>
      {Number.isInteger(index) && validate
        ? getHourMinSec(timeArray[index])
        : '--'}
    </td>
    )
  let thead = chartsNames.map(item =>
    <td key={item} scope="col">
      {dict.fields[item][userLang]}
    </td>)
  thead.push(
    <td key={'distance'} scope="col">
      {dict.fields.totalDistance[userLang]}</td>,
    <td key={'time'} scope="col">{dict.fields.time[userLang]}</td>)

  return (
    <table className={styles.refreshValues}>
      <thead>
        <tr>{thead}</tr>
      </thead>
      <tbody>
        <tr>{tbody}</tr>
      </tbody>
    </table>
  )
};

export default RefreshValuesFromCharts;