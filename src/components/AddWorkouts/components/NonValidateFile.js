import React from 'react';
import {dict, userLang} from "../../../config/config";

const NonValidateFile = ({name, text, className}) => {
  return (
    <div className={className}>
      <div>{name}</div>
      <div>
        <span>{text}</span>
      </div>
    </div>
  );
};

export default NonValidateFile;