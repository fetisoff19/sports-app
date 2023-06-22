import React from 'react';
import {useContext, useMemo, useRef, useState} from "react";
import styles from "../../styles.module.scss";
import Maps from "../../../Maps/Maps";
import Pushpin2 from "../../../UI/svgComponents/Pushpin2";
import Pushpin1 from "../../../UI/svgComponents/Pushpin1";
import NameSportDate from "../NameSportDate";
import MainWorkoutStats from "../WorkoutsStats/MainWorkoutStats";
import {dict, userLang} from "../../../../config/config";
import WorkoutStats from "../WorkoutsStats/WorkoutStats";
import TextArea from "../../../UI/TextArea";
import ViewWorkoutContext from "../../context/Context";
import {useSelector} from "react-redux";

const MapsAndStatsContainer = () => {
  const [stickyMaps, setStickyMaps] = useState(false);
  const mapsRef = useRef();
  const {polylinePowerCurve, polyline,
    index, setWriting, workout,} = useContext(ViewWorkoutContext);

  const funnyMarkers = useSelector(state => state.settings.funnyMarkers)

  const mapsButton = useMemo(() =>
      <div className={styles.buttonStickyMaps}
           onClick={handleClick}>
        {stickyMaps
          ? <Pushpin2 fill={'green'}/>
          : <Pushpin1 fill={'black'}/>}
      </div>,
    [stickyMaps])
  const mapsStyle = workout.chartsData ? {height: 300, width: 500} : {height: 400, width: 700}
  // реализовать через конфиг для мэпс
  const maps = useMemo(() =>
    polyline ?
      <div
        ref={mapsRef.current}
        className={(stickyMaps ? 'viewWorkoutMaps' : null) + ' ' + styles.maps}
        key={'maps'}>
        <Maps
          style={mapsStyle}
          maxZoom={19}
          startZoom={8}
          scrollWheelZoom={true}
          polylinePoints={polyline?.points}
          polylinePowerCurve={polylinePowerCurve}
          polylineStyle={{color: 'green'}}
          polylinePowerCurveStyle={{color: 'red'}}
          // smoothing={preparedData.smoothing}
          smoothing={1}
          markerStart={true}
          markerEnd={true}
          index={index}
          button={mapsButton}
          funnyMarkers={funnyMarkers}
        />
      </div> : null, [polyline, index, stickyMaps, polylinePowerCurve]);

  function handleClick(){
    setStickyMaps(prev => !prev)
  }

  return (
    <div className={styles.mapsNameStats}>
      <div className={styles.dateSportName}>
        <NameSportDate styles={styles}
          data={workout} setState={setWriting}/>
      </div>
      <MainWorkoutStats data={workout} styles={styles}/>
      {maps}
      <h1>
        {dict.title.stats[userLang]}
      </h1>
      <WorkoutStats styles={styles}
        data={workout} />
      <h1>
        {dict.title.notes[userLang]}
      </h1>
      <TextArea _id={workout._id} text={workout?.note}
        styles={styles} setState={setWriting}/>
    </div>
  );
};

export default MapsAndStatsContainer;