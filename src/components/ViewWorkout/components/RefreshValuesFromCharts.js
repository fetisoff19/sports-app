import React from 'react';
import {getHourMinSec, getMinSec} from "../../../API/functionsDate&Values";
import {dict, userLang} from "../../../config/config";

const RefreshValuesFromCharts = (props) => {
  let tbodyFields = props.charts.map(item => {
    let data = '';
    Number.isInteger(props.index)
      ? data = props.data[item].data[props.index][1]
      : data = '--'
    item === 'pace' && Number.isInteger(props.index)
      ? data = getMinSec(data)
      : data
    return (<td key={item}>{data}</td>)
    }
  )
  tbodyFields.push(
    <td key={'distance'}>
      {Number.isInteger(props.index)
        ? props.data[props.charts[0]].data[props.index][0]
        : '--'}
    </td>,
    <td key={'time'}>
      {Number.isInteger(props.index)
        ? getHourMinSec(props.time[props.index][0])
        : '--'}
    </td>
    )
  let theadFields = props.charts.map(item =>
    <th key={item} scope="col">
      {dict.fields[item][userLang]}
    </th>)
  theadFields.push(
    <th key={'distance'} scope="col">
      {dict.fields.totalDistance[userLang]}</th>,
    <th key={'time'} scope="col">{dict.fields.time[userLang]}</th>)

  return (
    <table>
      <tbody>
        <tr>{tbodyFields}</tr>
      </tbody>
      <thead>
        <tr>{theadFields}</tr>
      </thead>
    </table>
  );
};

export default RefreshValuesFromCharts;