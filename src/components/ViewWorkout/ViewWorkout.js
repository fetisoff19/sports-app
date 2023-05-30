import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import useDB from "../../hooks/useDB";
import {db} from "../../API/db.js";
import Maps from "../Maps/Maps";
import RefreshValuesFromCharts from "./components/RefreshValuesFromCharts";
import {addPolylinePowerCurve, getIndex, handleKeyboardDown, resetZoom, setCharts} from "./functions/functions";
import Highcharts from 'highcharts';
import Charts from "../HighCharts/HighCharts";
import AppContext from "../../context/AppContext.js";
import ShiftWorkoutButton from "./components/NextWorkout.js";
import {getDataForCharts} from "./functions/getDataForCharts";
import NameSportDate from "./components/NameSportDate";
import WorkoutStats from "./components/WorkoutsStats/WorkoutStats";
import {dict, userLang, chartsConfig} from "../../config/config";
import {useParams} from "react-router-dom";
import AppLoader from "../Loaders/AppLoader.jsx";
import TextArea from "../UI/TextArea";
import styles from './styles.module.scss'
import Info from "../UI/svgComponents/Info";
import MainWorkoutStats from "./components/WorkoutsStats/MainWorkoutStats";
import Pushpin1 from "../UI/svgComponents/Pushpin1.js";
import Pushpin2 from "../UI/svgComponents/Pushpin2";
import PageNotFound from "../../pages/PageNotFound";
import Error from "../../pages/Error";

let order = ['speed', 'pace', 'power', 'heartRate', 'cadence', 'altitude'];

const ViewWorkout = () => {
  const {settings} = useContext(AppContext);
  const [status, setStatus] = useState(false);
  const [zooming, setZooming] = useState(false);
  const [index, setIndex] = useState(null);
  const [polylinePowerCurve, setPolylinePowerCurve] = useState([]);
  const [stickyMaps, setStickyMaps] = useState(false);
  const chartsRef = useRef();
  const mapsRef = useRef();
  const btnResetZoomRef = useRef();
  const params = useParams();
  const id = +params.id;
  const [data, loading, error] = useDB(getWorkout, id);
  const [chartsIsLoaded, setChartsIsLoaded] = useState(false);
  const [writing, setWriting] = useState(false);

  async function getWorkout(){
      let result = await db.get('workoutsData', id);
      let wt = await db.get('workouts', id);
      return result || wt ? {...result, workout: wt} : null;
  }

  let preparedData = useMemo(() =>
    getDataForCharts(data, settings.smoothing || 8), [data]);

  let charts = useMemo(() => preparedData ?
    setCharts(preparedData, order, setZooming, setChartsIsLoaded)
    : null, [data]);
  let chartsNames = useMemo(() => charts ?
    charts.map(item => item.key) : null, [data]);
  let powerCurve = useMemo(() =>
    (preparedData && preparedData.charts.powerCurve ?
    <Charts
      key={id + 'charts'}
      data={preparedData.charts.powerCurve}
      name={'powerCurve'}
      style={{height: 210,  width: 700}}
      tooltip={true}
      f={addPolylinePowerCurve}
      mouseOver={[preparedData, setPolylinePowerCurve]}
      mouseOut={() => setPolylinePowerCurve([])}
      xAxis={{...chartsConfig.powerCurve.options.xAxis,
        ...{max: preparedData.charts.powerCurve.data.at(-1)[0]}}}
    />
    : null),[preparedData]);

  let chartsContainer = charts?.length ?
    (<div className={styles.charts}>
      <div className={styles.refreshValuesResetZoom}>
        {chartsNames && charts?.length ?
          <RefreshValuesFromCharts
            index={index}
            data={preparedData.charts}
            time={preparedData.step}
            charts={chartsNames}
            className={styles.refreshValues}
          />
          : null}
        <div className={styles.resetZoomInfo}>
          <div
            className={styles.resetZoom}
            ref={btnResetZoomRef.current}
            hidden={!zooming || !data}
            onClick={() => {
              resetZoom();
              setZooming(false);
            }}
          >
            {dict.title.resetZoom[userLang]}
          </div>
          <div className={styles.info}>
            <span className={styles.tooltip}>
              {dict.title.info1[userLang]
                + settings.smoothing
                + dict.title.info2[userLang]}
            </span>
            <Info className={styles}
              fill={'gray'} height={'20px'} width={'20px'}
            />
          </div>
        </div>
      </div>
      <div
        ref={chartsRef}
        style={{width: 800}}
        onMouseEnter={() => setStatus(true)}
        onMouseLeave={() => setStatus(false)}
      >
        {charts}
      </div>
      {powerCurve}
    </div>)
    : null;

  let mapsButton = useMemo(() => <div
    className={styles.buttonStickyMaps}
    onClick={() => setStickyMaps(prev => !prev) }>
    {stickyMaps ? <Pushpin2 fill={'green'}/> : <Pushpin1 fill={'black'}/>}
  </div>, [stickyMaps])

  let maps = useMemo(() =>
    preparedData?.polylinePoints ?
      <div
        ref={mapsRef.current}
        className={(stickyMaps ? 'viewWorkoutMaps' : null) + ' ' + styles.maps}
        key={id + 'maps'}>
        <Maps
          style={{height: 300, width: 500}}
          maxZoom={19}
          startZoom={8}
          scrollWheelZoom={true}
          polylinePoints={preparedData.polylinePoints}
          polylinePowerCurve={polylinePowerCurve}
          polylineStyle={{color: 'green'}}
          polylinePowerCurveStyle={{color: 'red'}}
          smoothing={preparedData.smoothing}
          markerStart={true}
          markerEnd={true}
          index={index}
          button={mapsButton}
        />
      </div> : null, [data, index, stickyMaps, polylinePowerCurve]);

  const onKeyDown = useCallback((e) => !writing ?
    handleKeyboardDown(e, setZooming) : null, [writing])
  const mouseMove = useCallback((e) =>
    getIndex(e, setIndex, chartsRef.current), [chartsRef.current])

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown',onKeyDown);
    }
  },  [writing]);

  useEffect(() => {
    if(!chartsIsLoaded) return;
    chartsRef.current?.addEventListener('mousemove', mouseMove);

    return () => {
      if(chartsIsLoaded) {
        chartsRef.current?.removeEventListener('mousemove', mouseMove);
        while (Highcharts.charts.length > 0) {
          Highcharts.charts.pop();
        }
      }
    }
  }, [chartsIsLoaded]);

  useEffect(() => {
    if(chartsIsLoaded && powerCurve)
    Highcharts.charts.forEach((chart) =>
      chart.series[0].name === 'powerCurve' ?
        chart.xAxis[0].setExtremes(chart.xAxis[0].min,
          chart.xAxis[0].max < 1200 ? chart.xAxis[0].max
            : chart.xAxis[0].max < 5600 ? 1200
              :chart.xAxis[0].max < 10800 ? 4800 : 7200)
        : null)
  }, [chartsIsLoaded]);

  useEffect(() => {
    // временное решение пока не пойму как полностью размонтировать элемент
    if(loading){
      chartsIsLoaded ? setChartsIsLoaded(false) : null
      zooming ? setZooming(false) : null;
      status ? setStatus(false) : null;
      index ? setIndex(null) : null;
      writing ? setWriting(false) : null;
    }
  }, [loading])

  ////////////////////////////////
  if (loading) {
    return <AppLoader/>;
  }
  else
    if (error) {
    console.error(error)
    return (
      <Error error={error}/>
    )
  }
  else if(data)
  {
    return (
        <div className={styles.page}>
          <ShiftWorkoutButton styles={styles}
             loaded={chartsContainer ? chartsIsLoaded : true}
            dir={0} id={id} key={id + '0'} />
          <div className={styles.container}>
            {chartsContainer}
            <div className={styles.mapsNameStats}>
              <div className={styles.dateSportName}>
                <NameSportDate styles={styles}
                  data={data.workout} key={id + 'name'} setState={setWriting}/>
              </div>
              <MainWorkoutStats data={data.workout} styles={styles}/>
              {maps}
              <h1>{dict.title.stats[userLang]}</h1>
              <WorkoutStats styles={styles}
                data={data.sessionMesgs[0]} key={id + 'stats'}/>
              <h1>{dict.title.notes[userLang]}</h1>
              <TextArea id={id} text={data?.workout?.note}
                styles={styles} setState={setWriting}/>
            </div>
          </div>
          <ShiftWorkoutButton styles={styles}
            loaded={chartsContainer ? chartsIsLoaded : true}
            dir={1} id={id} key={id + '1'} />
        </div>
    )
  }
  else return <PageNotFound/>
};

export default ViewWorkout;