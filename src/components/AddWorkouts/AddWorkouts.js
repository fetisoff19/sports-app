import React, {useContext, useEffect, useRef, useState} from 'react';
import {addFiles, validateFiles} from "../../API/utils.js";
import AppContext from "../../context/AppContext.js";
import styles from './styles.module.scss'
import FilesList from "./components/FilesList";
import {dict, userLang} from "../../config/config";
import {useDispatch} from "react-redux";
import {getWorkouts} from "../../actions/workouts";


export default function AddWorkouts() {
  // const {setRandom} = useContext(AppContext)
  const [upLoadedFiles, setUpLoadedFiles] = useState([]);
  const [validatedFiles, setValidatedFiles] = useState(null);
  const [drag, setDrag] = useState(false);
  const inputHiddenRef = useRef()
  const dispatch = useDispatch()

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
    let files = [...e.dataTransfer.files];
    //валидация файлов
    validateFiles(files)
      .then(result => setValidatedFiles(result))
    setDrag(false);
  }

  function handleClick() {
    inputHiddenRef.current.click()
  }

  function handleChange(e) {
    let files = [...e.target.files];
    files.length ?
      validateFiles(files)
        .then(result => setValidatedFiles(result))
      : null
  }

  useEffect(() => {
    if(upLoadedFiles?.length === validatedFiles?.validate?.length)
      dispatch(getWorkouts())
  }, [upLoadedFiles])

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
            setValidatedFiles={setValidatedFiles} styles={styles}
            validatedFiles={validatedFiles} upLoadedFiles={upLoadedFiles}/>
        </div>

        <button
          className={validatedFiles?.validate?.length ? styles.active : null}
          onClick={() => addFiles(validatedFiles?.validate, setUpLoadedFiles)}>
          {dict.title.download[userLang]}
        </button>
    </div>
  );
};
