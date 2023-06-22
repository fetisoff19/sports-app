import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.scss'
import FilesList from "./components/FilesList";
import {dict, userLang} from "../../config/config";
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../redux/actions/workouts";
import {resetStateUploadedFiles} from "../../redux/reducers/workoutsReducer";
import {auth} from "../../redux/actions/user";
import {cursorWaitOff, cursorWaitOn} from "../../redux/reducers/appReducer";


export default function AddWorkouts() {
  const [files, setFiles] = useState([]);
  const [drag, setDrag] = useState(false);
  const [buttonClick, setButtonClick] = useState(false);
  const inputHiddenRef = useRef();
  const dispatch = useDispatch();
  const uploadedFiles = useSelector(state => state.workouts.uploadedFiles);


  function dragStartHandler(e) {
    e.preventDefault();
    setDrag(true);
  }

  function dragLeaveHandler(e) {
    e.preventDefault();
    setDrag(false);
  }

  function onDropHandler(e) {
    e.preventDefault();
    setFiles([]);
    dispatch(resetStateUploadedFiles())
    setButtonClick(false)
    let workouts = [...e.dataTransfer.files]
      .filter(workout => workout.name.split('.').pop() === 'fit');
    setFiles(workouts)
    setDrag(false);
  }

  function handleClick() {
    inputHiddenRef.current.click()
  }

  function handleChange(e) {
    setFiles([]);
    dispatch(resetStateUploadedFiles())
    setButtonClick(false)
    let workouts = [...e.target.files]
      .filter(workout => workout.name.split('.').pop() === 'fit');
    setFiles(workouts)
  }

  async function uploadValidatedFiles() {
    if (files?.length) {
      setButtonClick(true)
      files.forEach(file => dispatch(uploadFile(file)))
    }
  }

  useEffect(() => {
    if(uploadedFiles.length && files.length === uploadedFiles.length) {
      console.log('useEffect')
      dispatch(auth())
    }
  })

  return (
    <div className={'content ' + styles?.content}>
      <h1>{dict.title.addWorkouts[userLang]}</h1>
        <div className={drag ? (styles.drop + ' ' + styles.dropArea) : styles.drop}
          onDragStart={e => dragStartHandler(e)}
          onDragLeave={e => dragLeaveHandler(e)}
          onDragOver={e => dragStartHandler(e)}
          onDrop={e => onDropHandler(e)}>
          <span className={styles.label}>
            {dict.title.add1[userLang]}
            <span className={styles.input} onClick={handleClick}>
                {dict.title.browse[userLang]}
              <input
                type='file' multiple accept={'.fit'}
                ref={inputHiddenRef} onChange={handleChange}/>
              </span>
            {dict.title.add2[userLang]}
          </span>
          <FilesList
            files={files} setFiles={setFiles} styles={styles}/>
        </div>
        <button
          disabled={buttonClick}
          className={!buttonClick && files?.length ? styles.active : null}
          onClick={uploadValidatedFiles}>
          {dict.title.download[userLang]}
        </button>
    </div>
  );
};
