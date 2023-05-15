import React from 'react';
import {FallingLines} from "react-loader-spinner";

const FooterLoader = () => {
  return (
    <div>
      <FallingLines
        color="#4fa94d"
        width="40"
        visible={true}
        ariaLabel='falling-lines-loading'
      />
    </div>
  );
};

export default FooterLoader;