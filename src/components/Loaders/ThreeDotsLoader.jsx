import React from 'react';
import {ThreeDots} from "react-loader-spinner";

const ThreeDotsLoader = ({className}) => {
  return (
    <div className={'appLoader ' + className}>
      <ThreeDots
        height="50"
        width="50"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default ThreeDotsLoader;