import React from 'react';
import {dict, userLang} from "../../config/config";

const SportAndDate = ({data, className}) => {
  return (
    <div className={className}>
        {(dict.sports.hasOwnProperty(data.sport)
            ? dict.sports[data.sport][userLang]
            : dict.sports.other[userLang]) + ', '
          + (data.timestamp.toLocaleString() || '')}
    </div>
  );
};

export default SportAndDate;