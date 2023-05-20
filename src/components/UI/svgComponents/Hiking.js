import React from 'react';

const Hiking = ({height, width, fill, className}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         className={className}
         // fill={fill || 'black'}
         width={width || '24px'}
         height={height || '24px'}
         viewBox="0 0 24 24">
      <path d="M14 22V16L12 14M12 14L13 8M12 14H10M13 8C14 9.16667 15.6 11 18 11M13 8L12.8212 7.82124C12.2565 7.25648 11.2902 7.54905 11.1336 8.33223L10 14M10 14L8 22M18 9.5V22M8 7H7.72076C7.29033 7 6.90819 7.27543 6.77208 7.68377L5.5 11.5L7 12L8 7ZM14.5 3.5C14.5 4.05228 14.0523 4.5 13.5 4.5C12.9477 4.5 12.5 4.05228 12.5 3.5C12.5 2.94772 12.9477 2.5 13.5 2.5C14.0523 2.5 14.5 2.94772 14.5 3.5Z" stroke={fill || "#000000"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
};

export default Hiking;