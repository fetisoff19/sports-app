import React from 'react';
import {dict, userLang} from "../../../config/config";
import {Link} from "react-router-dom";

const DuplicateFile = ({data, className}) => {
  const [id, name] = data;
  return (
    <div className={className}>
      <div>{name}</div>
      <div>
        <span>{dict.title.duplicateFile[userLang] + '. '}</span>
        <Link to={'../workouts/' + id}>
          <span>{dict.title.more[userLang]}</span>
        </Link>
      </div>

    </div>
  );
};

export default DuplicateFile;