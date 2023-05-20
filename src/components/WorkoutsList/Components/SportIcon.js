import React from 'react';
import Cycling from "../../UI/svgComponents/Cycling";
import Running from "../../UI/svgComponents/Running";
import Walking from "../../UI/svgComponents/Walking";
import Hiking from "../../UI/svgComponents/Hiking";
import Fitness from "../../UI/svgComponents/Fitness";
import Other from "../../UI/svgComponents/Other";

const SportIcon = ({sport, fill, height, width}) => {
  const sportIcon =
   sport === 'cycling'
      ? <Cycling  fill={fill} height={height} width={width}/>
      : sport === 'running'
        ?  <Running fill={fill} height={height} width={width}/>
        : sport === 'walking' ? <Walking fill={fill} height={height} width={width}/>
          : sport === 'hiking' ? <Hiking fill={fill} height={height} width={width}/>
            : sport === 'fitness' ? <Fitness fill={fill} height={height} width={width}/>
              : <Other fill={fill} height={height} width={width}/>
  return (
    <>
      {sportIcon}
    </>
  );
};

export default SportIcon;