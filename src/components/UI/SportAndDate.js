import React from 'react';
import {dict, userLang} from "../../config/config";

const SportAndDate = ({data, className}) => {
  return (
    <div className={className}>
        {(dict.sports[data.sport][userLang] || '') + ', '
          + (data.startTime.toLocaleString() || '')}
    </div>
  );
};

export default SportAndDate;