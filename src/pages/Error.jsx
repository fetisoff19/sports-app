import React from 'react';
import {Link} from "react-router-dom";
import {dict, userLang} from "../config/config";
import {setError} from "../reducers/appReducer";
import {useDispatch} from "react-redux";

const Error = ({error}) => {
  const dispatch = useDispatch();

  function clearError(){
    dispatch(setError(null))
  }
  return (
    <div className={'content error'}>
      <h1>{dict.title.error[userLang] + ': ' +  error?.message || 'unknown error'}</h1>
      <Link to={'/'}>
        <div onClick={clearError}>
          {dict.title.goToDashboard[userLang]}
        </div>
      </Link>
    </div>
    )
};

export default Error;