import React, {useContext, useMemo} from 'react';
import Charts from "../../../../HighCharts/HighCharts.js";
import {addPolylinePowerCurve} from "../../../functions/functions.js";
import {chartsConfig} from "../../../../../config/config.js";
import ViewWorkoutContext from "../../../context/Context.js";

const PowerCurve = () => {
  const {
    powerCurve,
    workout,
    setPolylinePowerCurve,
    polyline} = useContext(ViewWorkoutContext)

  const powerCurveData = useMemo(() => {
    if(workout.powerCurve && powerCurve?.points) {
      let map = new Map(Object.entries(powerCurve.points));
      let powerCurveArray = [];
      map.forEach((value, key) =>
        powerCurveArray.push([+key, value.value])
      )
      return powerCurveArray
    }
  }, [powerCurve])

  const chart = useMemo(() =>
    powerCurveData?.length && powerCurve
      ? <Charts
          data={{data: powerCurveData}}
          // data2={preparedData.charts.powerCurveAllTime}
          name={'powerCurve'}
          // name2={'powerCurveAllTime'}
          // powerCurveAllTimeMap={preparedData.powerCurveAllTimeMap}
          style={{height: 210,  width: 700}}
          tooltip={true}
          addPolylinePowerCurve={addPolylinePowerCurve}
          mouseOver={[powerCurve, polyline?.points, setPolylinePowerCurve, workout?.smoothing]}
          mouseOut={() => setPolylinePowerCurve([])}
          xAxis={{...chartsConfig.powerCurve.options.xAxis,
            ...{max: powerCurveData.at(-1)[0]}}}
          animation={true}
        />
      : null
  , [powerCurveData])

  return (
    <>
      {chart}
    </>
  )
};

export default React.memo(PowerCurve);