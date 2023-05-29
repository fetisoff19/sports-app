import React from 'react';
import {dict, userLang} from "../../../config/config";
import {Link} from "react-router-dom";

const DuplicateFile = ({data, className}) => {
  return (
    <div className={className}>
      <div>{data[1]}</div>
      <div>
        <span>{dict.title.duplicateFile[userLang] + '. '}</span>
        <Link to={'../workouts/' + data[0]}>
          <span>{dict.title.more[userLang]}</span>
        </Link>
      </div>

    </div>
  );
};

export default DuplicateFile;