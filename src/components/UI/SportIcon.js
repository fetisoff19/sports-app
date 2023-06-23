import React from 'react';
import Cycling from "./svgComponents/Sports/Cycling.js";
import Running from "./svgComponents/Sports/Running.js";
import Walking from "./svgComponents/Sports/Walking.js";
import Hiking from "./svgComponents/Sports/Hiking.js";
import Fitness from "./svgComponents/Sports/Fitness.js";
import Other from "./svgComponents/Sports/Other.js";

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