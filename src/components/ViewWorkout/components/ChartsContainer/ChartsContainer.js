import React from 'react';
import styles from "../../styles.module.scss";
import RefreshValuesFromCharts from "./components/RefreshValuesFromCharts.js";
import {setCharts} from "../../functions/functions.js";
import {useMemo} from "react";
import PowerCurve from "./components/PowerCurve.js";
import {useContext} from "react";
import ViewWorkoutContext from "../../context/Context";
import ResetZoomAndInfo from "./components/ResetZoomAndInfo.js";

const order = ['speed', 'pace', 'power', 'heartRate', 'cadence', 'altitude'];

const ChartsContainer = () => {
  const {dataForCharts, chartsRef,
    setZooming, workout,
    setChartsIsLoaded,
    setMouseOnCharts,} = useContext(ViewWorkoutContext);

  const charts = useMemo(() => dataForCharts ?
    setCharts(dataForCharts, order, setZooming, setChartsIsLoaded)
    : null, [dataForCharts]);

  const chartsNames = useMemo(() => charts ?
    charts.map(item => item?.props?.name) : null, [charts]);


  return (
    (<div className={styles.charts}>
      <div className={styles.refreshValuesResetZoom}>
        {chartsNames.length
          && <RefreshValuesFromCharts chartsNames={chartsNames}/>}
        <ResetZoomAndInfo/>
      </div>
      <div
        key={workout._id}
        ref={chartsRef}
        className={styles.chatsContainer}
        onMouseEnter={() => setMouseOnCharts(true)}
        onMouseLeave={() => setMouseOnCharts(false)}
      >
        {charts}
      </div>
      <PowerCurve/>
    </div>
    )
  );
};

export default ChartsContainer;