import React from 'react';
import {Link} from "react-router-dom";
import {dict, userLang} from "../config/config";

const Error = ({error}) => {
  return (
    <div className={'content error'}>
      <h1>{dict.ui.error[userLang] + ': ' +  error?.message || 'unknown error'}</h1>
      <Link to={'/'}>{dict.title.goToDashboard[userLang]}</Link>
    </div>
    )
};

export default Error;