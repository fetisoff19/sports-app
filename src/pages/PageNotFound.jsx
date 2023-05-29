import React from 'react';
import {dict, userLang} from "../config/config";
import {Link} from "react-router-dom";

const PageNotFound = () => {

  return (
    <div className={'content error'}>
      <h1>{dict.title.pageNotFound[userLang]}</h1>
      <Link to={'/'}>{dict.title.goToDashboard[userLang]}</Link>
    </div>
  )
};

export default PageNotFound;