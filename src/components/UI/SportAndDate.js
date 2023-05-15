import React from 'react';
import {dict, userLang} from "../../config/config";

const SportAndDate = ({data}) => {
  return (
    <div>
        {(dict.sports[data.sport][userLang] || '') + ', '
          + (data.startTime.toLocaleString() || '')}
    </div>
  );
};

export default SportAndDate;