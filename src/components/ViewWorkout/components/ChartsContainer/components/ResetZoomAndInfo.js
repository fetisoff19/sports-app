import React from 'react';
import styles from "../../../styles.module.scss";

import {dict, userLang} from "../../../../../config/config.js";
import Info from "../../../../UI/svgComponents/Info.js";
import {useContext} from "react";
import ViewWorkoutContext from "../../../context/Context.js";
import {resetZoom} from "../../../functions/functions.js";

const ResetZoomAndInfo = () => {
  const {dataForCharts, zooming, setZooming} = useContext(ViewWorkoutContext)

  function handleClick(){
    resetZoom();
    setZooming(false);
  }

  return (
    <div className={styles.resetZoomInfo}>
      <div
        className={styles.resetZoom}
        hidden={!zooming || !dataForCharts}
        onClick={handleClick}
      >
        {dict.title.resetZoom[userLang]}
      </div>
      <div className={styles.info}>
        <span className={styles.tooltip}>
          {dict.title.info1[userLang]
            + dataForCharts?.smoothing
            + dict.title.info2[userLang]}
        </span>
        <Info className={styles}/>
      </div>
    </div>
  );
};

export default React.memo(ResetZoomAndInfo);