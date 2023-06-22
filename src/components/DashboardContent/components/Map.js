import React, {useMemo} from 'react';
import {useEffect} from "react";
import {getPolyline} from "../../../redux/actions/workouts";
import Maps from "../../Maps/Maps";
import styles from "../styles.module.scss";
import {dict, userLang} from "../../../config/config";
import {useDispatch, useSelector} from "react-redux";

const Map = ({id}) => {
  const dispatch = useDispatch();
  const polylines = useSelector(state => state.workouts.polylines)
  let polyline = useMemo(() => polylines.find(item => item._id === id), [polylines])

  useEffect(() => {
    if(id && !polyline)
      dispatch(getPolyline(id))
  }, [])


  if(!id){
    return (
      <div className={styles.plug}>
        {dict.title.indoorWorkout[userLang]}
      </div>
    )
  }
  else if(polyline?.points?.length) {
    return (
      <Maps
        polylinePoints={polyline.points}
        startZoom={13}
        maxZoom={19}
        style={{height: 200, width: 200}}
        polylineStyle={{color: 'green'}}
        scrollWheelZoom={false}
      />
    )
  } else return <div className={styles.plug}/>
};

export default React.memo(Map);