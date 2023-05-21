import React from 'react';
import Cycling from "./svgComponents/Cycling.js";
import Running from "./svgComponents/Running.js";
import Walking from "./svgComponents/Walking.js";
import Hiking from "./svgComponents/Hiking.js";
import Fitness from "./svgComponents/Fitness.js";
import Other from "./svgComponents/Other.js";

const SportIcon = ({sport, fill, height, width, className}) => {
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
    <div className={className}>
      {sportIcon}
    </div>
  );
};

export default SportIcon;