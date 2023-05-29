import React, {useContext, useEffect, useRef, useState} from 'react';
import {addFiles, addFitFile, validateFiles} from "../../API/utils.js";
import useAdd from "../../hooks/useAdd.js";
import AddWorkoutsLoader from "../Loaders/AddWorkoutsLoader.jsx";
import AppContext from "../../context/AppContext.js";
import styles from './styles.module.scss'
import FilesList from "./components/FilesList";


export default function AddWorkouts() {
  // const {setRandom} = useContext(AppContext)
  // const [count, setCount] = useState(0);
  const [validatedFiles, setValidatedFiles] = useState(null);
  const [drag, setDrag] = useState(false);
  // const ref = useRef();
  // const inputHiddenRef = useRef()

  // const [data, loading, error] = useAdd(ref.current, addFitFile)

  // useEffect(() => {
  //   setCount(count + 1);
  //   return data?.added?.length
  //     ? () => setRandom(Math.random()) : () => {};
  // }, [data])

  console.log(validatedFiles)
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

  return (
    <div className='content'>
      <h1>Добавить занятия</h1>
      {drag ?
        <div className={styles.drop + ' ' + styles.dropArea}
          onDragStart={e => dragStartHandler(e)}
          onDragLeave={e => dragLeaveHandler(e)}
          onDragOver={e => dragStartHandler(e)}
          onDrop={e => onDropHandler(e)}>
          <div className={styles.label}>
            Перетащите файлы (в формате .fit) сюда или нажмите Обзор для выбора.
          </div>
          <FilesList setValidatedFiles={setValidatedFiles} styles={styles} validatedFiles={validatedFiles}/>
        </div>
        :
        <div className={styles.drop}
          onDragStart={e => dragStartHandler(e)}
          onDragLeave={e => dragLeaveHandler(e)}
          onDragOver={e => dragStartHandler(e)}>
          <div className={styles.label}>
            Перетащите файлы (в формате .fit) сюда или нажмите Обзор для выбора.
          </div>
          <FilesList setValidatedFiles={setValidatedFiles} styles={styles} validatedFiles={validatedFiles}/>
        </div>
      }
      {validatedFiles?.validate?.length ? <button onClick={() => addFiles(validatedFiles?.validate)}>Загрузить</button> : null}
    </div>
  );
};
