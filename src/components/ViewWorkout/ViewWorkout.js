import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import useDB from "../../hooks/useDB";
import {db} from "../../API/db.js";
import Maps from "../Maps/Maps";
import RefreshValuesFromCharts from "./components/RefreshValuesFromCharts";
import {getIndex, handleKeyboardDown, resetZoom, setCharts} from "./functions/functions";
import Highcharts from 'highcharts';
import Charts from "../HighCharts/HighCharts";
import AppContext from "../../context/AppContext.js";
import ShiftWorkoutButton from "./components/NextWorkout.js";
import {chartsConfig} from "../HighCharts/config";
import {getDataForCharts} from "./functions/getDataForCharts";
import NameSportDate from "./components/NameSportDate";
import WorkoutStats from "./components/WorkoutsStats/WorkoutStats";
import {dict, userLang} from "../../config/config";
import {Link, useParams} from "react-router-dom";
import AppLoader from "../Loaders/AppLoader.jsx";
import TextArea from "../UI/TextArea";
import styles from './styles.module.scss'
import Info from "../UI/svgComponents/Info";
import MainWorkoutStats from "./components/WorkoutsStats/MainWorkoutStats";

let order = ['speed', 'pace', 'power', 'heartRate', 'cadence', 'altitude'];

const ViewWorkout = () => {
  const {settings} = useContext(AppContext);
  const [status, setStatus] = useState(false);
  const [zooming, setZooming] = useState(false);
  const [index, setIndex] = useState(null);
  const [stickyMaps, setStickyMaps] = useState(false);
  const chartsRef = useRef();
  const mapsRef = useRef();
  const btnResetZoomRef = useRef();
  const params = useParams();
  const id = +params.id;
  const [data, loading, error] = useDB(getWorkout, id);
  const [chartsIsLoaded, setChartsIsLoaded] = useState(false)

  async function getWorkout(){
      let result = await db.get('workoutsData', id);
      let wt = await db.get('workouts', id);
      return result || wt ? {...result, workout: wt} : null;
  }


  let preparedData = useMemo(() => getDataForCharts(data, settings.smoothing || 8), [data]);

  let mapsButton = <div
    className={styles.buttonStickyMaps + (stickyMaps ? (" " + styles.active) : '')}
    onClick={() => setStickyMaps(prev => !prev) }>
    {stickyMaps ? "Отвязать карту" : "Зафиксировать карту"}
  </div>

  let maps = useMemo(() =>
    preparedData ?
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
            polylineStyle={{color: 'green'}}
            popupStartText={'DashboardContent'}
            popupEndText={'End'}
            smoothing={settings.smoothing}
            markerStart={true}
            markerEnd={true}
            index={index}
            button={mapsButton}
          />
  </div> : null, [data, index, stickyMaps]);


  let charts = useMemo(() => preparedData ? setCharts(preparedData, order, setZooming, setChartsIsLoaded) : null, [data]);
  let chartsNames = useMemo(() => charts ? charts.map(item => item.key) : null, [data]);
  let powerCurve = useMemo(() => (preparedData && preparedData.charts.powerCurve ?
    <Charts
      key={id + 'charts'}
      data={preparedData.charts.powerCurve}
      name={'powerCurve'}
      style={{height: 200,  width: 1000}}
      tooltip={true}
      xAxis={{...chartsConfig.powerCurve.options.xAxis,
        ...{max: preparedData.charts.powerCurve.data.at(-1)[0]}}}
    />
    : null),[preparedData]);

  let chartsContainer = charts?.length ?
    <div className={styles.charts}>
      <div className={styles.refreshValuesResetZoom}>
        {chartsNames && charts?.length ?
          <RefreshValuesFromCharts
            key={id + 'refresh'}
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
            key={id + 'resetZoom'}
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
            <span className={styles.tooltip}>{'smoothing: ' + settings.smoothing}</span>
            <Info className={styles}
                  fill={'gray'} height={'20px'} width={'20px'}
                  text={'Smoothing: ' + settings.smoothing}
            />
          </div>
        </div>
      </div>
      <div
        key={id + 'chartsRef'}
        ref={chartsRef}
        style={{width: 800}}
        onMouseEnter={() => setStatus(true)}
        onMouseLeave={() => setStatus(false)}
      >
        {charts}
      </div>
      {powerCurve}
    </div>
    : null;


  const onKeyDown = useCallback((e) => handleKeyboardDown(e, setZooming), [])
  const mouseMove = useCallback((e) => getIndex(e, setIndex, chartsRef.current), [chartsRef.current])

  useEffect(() => {
    if(!chartsIsLoaded) return () => {};
    document.addEventListener('keydown', onKeyDown);
    chartsRef.current?.addEventListener('mousemove', mouseMove)

    return () => {
      document.removeEventListener('keydown',onKeyDown);
      chartsRef.current?.removeEventListener('mousemove', mouseMove);
      while (Highcharts.charts.length > 0) {
        Highcharts.charts.pop();
      }
    }
  }, [chartsIsLoaded]);

  useEffect(() => {
    // временное решение пока не пойму как полностью размонтировать элемент
    if(loading){
      chartsIsLoaded ? setChartsIsLoaded(false) : null
      zooming ? setZooming(false) : null;
      status ? setStatus(false) : null;
      index ? setIndex(null) : null;
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
      <div>
        <div>Ошибка: {error.message}</div>
        <Link to={'../'}>
          <h3>На главную</h3>
        </Link>
      </div>
    )
  }
  else if(data)
  {
    return (
        <div className={styles.page}>
          <ShiftWorkoutButton
            styles={styles} loaded={chartsIsLoaded}
            dir={0} id={id} key={id + '0'} />
          <div className={styles.container}>
            {chartsContainer}
            <div className={styles.mapsNameStats}>

              <div className={styles.dateSportName}>
                <NameSportDate styles={styles} data={data.workout} key={id + 'name'}/>
              </div>
              <MainWorkoutStats data={data.workout} styles={styles}/>
              {maps}
              <h1>Cтатистика</h1>
              <WorkoutStats styles={styles} data={data.sessionMesgs[0]} key={id + 'stats'}/>
              <h1>Заметки</h1>
              <TextArea id={id} text={data?.workout?.note} styles={styles}/>
            </div>
          </div>
          <ShiftWorkoutButton
            styles={styles} loaded={chartsIsLoaded}
            dir={1} id={id} key={id + '1'} />
        </div>
    )
  }
  else return (
    <div>
      <h1>Такого занятия не существует</h1>
      <Link to={'../'}>
        <h3>На главную</h3>
      </Link>
    </div>
  )
};

export default ViewWorkout;