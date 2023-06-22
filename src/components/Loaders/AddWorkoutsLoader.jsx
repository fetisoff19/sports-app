import React from 'react';
import {ThreeDots} from "react-loader-spinner";
import {useDispatch} from "react-redux";
import {useEffect} from "@types/react";
import {cursorWaitOff, cursorWaitOn} from "../../redux/reducers/appReducer";

const AddWorkoutsLoader = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(cursorWaitOn())
    return () => {
      dispatch(cursorWaitOff())
    }
  }, []);
  return (
    <div className='container'>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default AddWorkoutsLoader;