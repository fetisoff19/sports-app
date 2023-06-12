import React, {useEffect, useRef, useState} from 'react';
import {addFiles, validateFiles} from "../../API/utils.js";
import styles from './styles.module.scss'
import FilesList from "./components/FilesList";
import {dict, userLang} from "../../config/config";
import {useDispatch, useSelector} from "react-redux";
import {uploadFile} from "../../redux/actions/workouts";


export default function AddWorkouts() {
  const [upLoadedFiles, setUpLoadedFiles] = useState([]);
  const [validatedFiles, setValidatedFiles] = useState([]);
  const [drag, setDrag] = useState(false);
  const [count, setCount] = useState(0)
  const inputHiddenRef = useRef()
  const dispatch = useDispatch()
  // const files = useSelector(state => state.user.files)

  // let dirWorkoutsData = files?.find(file => file.name === 'workoutsData')?._id

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
    setValidatedFiles(files)
    //валидация файлов
    // validateFiles(files)
    //   .then(result => setValidatedFiles(result))
    setDrag(false);
  }

  function handleClick() {
    inputHiddenRef.current.click()
  }

  function handleChange(e) {
    let files = [...e.target.files];
    files.length
      ? setValidatedFiles(files)
      : null
    // let files = [...e.target.files];
    // files.length ?
    //   validateFiles(files)
    //     .then(result => setValidatedFiles(result))
    //   : null
  }

  function uploadValidatedFiles(){
    console.log(validatedFiles)
    if (validatedFiles?.length) {
      validatedFiles?.forEach(file =>
        dispatch(uploadFile(file, setCount)))
    }
    // addFiles(validatedFiles?.validate, setUpLoadedFiles);
    // validatedFiles?.validate.forEach(file =>
    //   dispatch(uploadFile(file)));
  }

  // useEffect(() => {
  //   if(upLoadedFiles?.length === validatedFiles?.validate?.length) {
  //
  //     dispatch(getWorkouts())
  //   }
  // }, [upLoadedFiles])

  return (
    <div className={'content ' + styles?.content}>
      <h1>{dict.title.addWorkouts[userLang]}</h1>
        <div>{'Count: ' + count}</div>
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
          className={validatedFiles?.length ? styles.active : null}
          onClick={uploadValidatedFiles}>
          {dict.title.download[userLang]}
        </button>
    </div>
  );
};
