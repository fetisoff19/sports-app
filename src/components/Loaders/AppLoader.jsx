import React from 'react';
import {TailSpin} from "react-loader-spinner";

const AppLoader = ({height, width}) => {
  return (
    <div className='appLoader'>
      <TailSpin
        height={height || '80'}
        width={width || '80'}
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default AppLoader;