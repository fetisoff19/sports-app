import React from 'react';
import {dict, userLang} from "../../../config/config";

const NonValidateFile = ({name, className}) => {
  return (
    <div className={className}>
      <div>{name}</div>
      <div>
        <span>{dict.title.nonValidateFile[userLang]}</span>
      </div>
    </div>
  );
};

export default NonValidateFile;