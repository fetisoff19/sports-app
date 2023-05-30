import React from 'react';
import {getHourMinSec, getMinSec} from "../../../API/functionsDate&Values";
import {dict, userLang, chartsConfig} from "../../../config/config";

const RefreshValuesFromCharts = (props) => {
  let tbody = props.charts.map(item => {
    let data = '';
    Number.isInteger(props.index)
      ? data = props.data[item].data[props.index][1]
      : data = '--'
    item === 'pace' && Number.isInteger(props.index)
      ? data = getMinSec(data)
      : data
    return (<td style={{color: chartsConfig[item].lineColor}} key={item}>{data}</td>)
    }
  )
  tbody.push(
    <td key={'distance'} style={{color: 'orange', minWidth: 75}}>
      {Number.isInteger(props.index)
        ? props.data[props.charts[0]].data[props.index][0]
        : '--'}
    </td>,
    <td key={'time'} style={{color: 'gray', minWidth: 85}}>
      {Number.isInteger(props.index)
        ? getHourMinSec(props.time[props.index][0])
        : '--'}
    </td>
    )
  let thead = props.charts.map(item =>
    <td key={item} scope="col">
      {dict.fields[item][userLang]}
    </td>)
  thead.push(
    <td key={'distance'} scope="col">
      {dict.fields.totalDistance[userLang]}</td>,
    <td key={'time'} scope="col">{dict.fields.time[userLang]}</td>)

  return (
    <table className={props.className}>
      <thead>
        <tr>{thead}</tr>
      </thead>
      <tbody>
        <tr>{tbody}</tr>
      </tbody>
    </table>
  );
};

export default RefreshValuesFromCharts;