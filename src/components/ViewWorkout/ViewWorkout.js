import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Maps from "../Maps/Maps";
import RefreshValuesFromCharts from "./components/RefreshValuesFromCharts";
import {
  addPolylinePowerCurve,
  getIndex,
  handleKeyboardDown,
  resetZoom,
  setCharts
} from "./functions/functions";
import Highcharts from 'highcharts';
import Charts from "../HighCharts/HighCharts";
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
import {useDispatch, useSelector} from "react-redux";
import {getOneFile} from "../../redux/actions/workouts";

let order = ['speed', 'pace', 'power', 'heartRate', 'cadence', 'altitude'];

const ViewWorkout = () => {
  const [status, setStatus] = useState(false);
  const [zooming, setZooming] = useState(false);
  const [index, setIndex] = useState(null);
  const [polylinePowerCurve, setPolylinePowerCurve] = useState([]);
  const [stickyMaps, setStickyMaps] = useState(false);
  const chartsRef = useRef();
  const mapsRef = useRef();
  const btnResetZoomRef = useRef();
  const params = useParams();
  const _id = params.id;
  const [chartsIsLoaded, setChartsIsLoaded] = useState(false);
  const [writing, setWriting] = useState(false);

  const dispatch = useDispatch()
  const loader = useSelector(state => state.app.appLoader)
  const error = useSelector(state => state.app.error)
  const smoothing = useSelector(state => state.settings.smoothing)
  const funnyMarkers = useSelector(state => state.settings.funnyMarkers)
  const workout = useSelector(state =>
    state?.workouts?.workouts?.find(workout => workout._id === _id))
  const workoutFitFile = useSelector(state => state.workouts.workout);

  useEffect(() => {
    _id ? dispatch(getOneFile(_id)) : null;
    chartsIsLoaded ? setChartsIsLoaded(false) : null;
    zooming ? setZooming(false) : null;
    status ? setStatus(false) : null;
    index ? setIndex(null) : null;
    writing ? setWriting(false) : null;
  }, [_id])

  // console.log(  _id,
  // chartsIsLoaded,
  // zooming,
  // status,
  // index,
  // writing,)

  let powerCurve = useMemo(() => workout?.powerCurve['1'] ? new Map(Object.entries(workout?.powerCurve)) : null, [workout])

  let preparedData = useMemo(() =>
   workoutFitFile && workout ? getDataForCharts(workoutFitFile, +smoothing, powerCurve) : null, [workoutFitFile, workout]);

  let charts = useMemo(() => preparedData ?
    setCharts(preparedData, order, setZooming, setChartsIsLoaded)
    : null, [workoutFitFile]);

  let chartsNames = useMemo(() => charts ?
    charts.map(item => item.key) : null, [workoutFitFile]);

  let powerCurveChart = useMemo(() =>
    (preparedData && preparedData.charts?.powerCurve ?
    <Charts
      key={_id + 'charts'}
      data={preparedData.charts.powerCurve}
      data2={preparedData.charts.powerCurveAllTime}
      name={'powerCurve'}
      name2={'powerCurveAllTime'}
      powerCurveAllTimeMap={preparedData.powerCurveAllTimeMap}
      style={{height: 210,  width: 700}}
      tooltip={true}
      addPolylinePowerCurve={addPolylinePowerCurve}
      mouseOver={[preparedData, setPolylinePowerCurve]}
      mouseOut={() => setPolylinePowerCurve([])}
      xAxis={{...chartsConfig.powerCurve.options.xAxis,
        ...{max: preparedData.charts.powerCurve.data.at(-1)[0]}}}
      animation={true}
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
            hidden={!zooming || !workoutFitFile}
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
                + smoothing
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
      {powerCurveChart}
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
        key={_id + 'maps'}>
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
          funnyMarkers={funnyMarkers}
        />
      </div> : null, [workoutFitFile, index, stickyMaps, polylinePowerCurve]);

  const onKeyDown = useCallback((e) => !writing ?
    handleKeyboardDown(e, setZooming) : null, [writing])
  const mouseMove = useCallback((e) =>
    getIndex(e, setIndex, chartsRef.current), [chartsRef.current])

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
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

  ////////////////////////////////
  if (loader || !workoutFitFile) {
    return <AppLoader/>;
  }
  else
    if (error) {
    console.error(error)
    return (
      <Error error={error}/>
    )
  }
  else if(workoutFitFile)
  {
    return (
        <div className={styles.page}>
          <ShiftWorkoutButton styles={styles}
             loaded={chartsContainer ? chartsIsLoaded : true}
            dir={0} _id={_id} key={_id + '0'} />
          <div className={styles.container}>
            {chartsContainer}
            <div className={styles.mapsNameStats}>
              <div className={styles.dateSportName}>
                <NameSportDate styles={styles}
                  data={workout} key={_id + 'name'} setState={setWriting}/>
              </div>
              <MainWorkoutStats data={workout} styles={styles}/>
              {maps}
              <h1>{dict.title.stats[userLang]}</h1>
              <WorkoutStats styles={styles}
                data={workout} key={_id + 'stats'}/>
              <h1>{dict.title.notes[userLang]}</h1>
              <TextArea _id={_id} text={workout?.note}
                styles={styles} setState={setWriting}/>
            </div>
          </div>
          <ShiftWorkoutButton styles={styles}
            loaded={chartsContainer ? chartsIsLoaded : true}
            dir={1} _id={_id} key={_id + '1'} />
        </div>
    )
  }
  else return <PageNotFound/>
};

export default ViewWorkout;