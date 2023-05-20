import React from 'react';

const Other = ({height, width, fill, className}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         className={className}
         fill={fill || 'black'}
         width={width || '24px'}
         height={height || '24px'}
         viewBox="0 0 1000 1000">
      <path d="M244 416q-35 0-59.5 24.5T160 500t24.5 59.5T244 584t59.5-24.5T328 500t-24.5-59.5T244 416zm256 0q-35 0-59.5 24.5T416 500t24.5 59.5 59 24.5 59.5-24.5 25-59.5-25-59.5-60-24.5h1zm256 0q-35 0-59.5 24.5T672 500t24.5 59.5T756 584t59.5-24.5T840 500t-24.5-59.5T756 416z"/>
    </svg>
  );
};

export default Other;