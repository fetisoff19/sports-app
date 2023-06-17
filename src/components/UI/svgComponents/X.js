import React from 'react';

const X = ({height, width, fill, className}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         className={className}
         width={width || '16px'}
         height={height || '16px'}
         viewBox="0 0 1024 1024">
      <path fill={fill || 'black'} d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"/>
    </svg>
  )
};

export default X;