import React from 'react';

const Pushpin2 = ({height, width, fill, className}) => {
  return (
    <svg
      className={className}
      fill={fill || 'black'}
      width={width || '24px'}
      height={height || '24px'}
      viewBox="0 0 24 24">
      <g>
        <path fill="none" d="M0 0h24v24H0z"/>
        <path fill={fill} d="M18 3v2h-1v6l2 3v2h-6v7h-2v-7H5v-2l2-3V5H6V3h12zM9 5v6.606L7.404 14h9.192L15 11.606V5H9z"/>
      </g>
    </svg>
  );
};

export default Pushpin2;