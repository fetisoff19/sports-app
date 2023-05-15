import React, {useContext, useEffect, useRef, useState} from 'react';
import {addFitFile} from "../../API/utils.js";
import useAdd from "../../hooks/useAdd.js";
import AddWorkoutsLoader from "../Loaders/AddWorkoutsLoader.jsx";
import AppContext from "../../context/AppContext.js";

export default function AddWorkouts() {
  const {setRandom} = useContext(AppContext)
  const [count, setCount] = useState(0)
  const ref = useRef()
  const [data, loading, error] = useAdd(ref.current, addFitFile)

  useEffect(() => {
    setCount(count + 1);
    return data?.added?.length ? () => setRandom(Math.random()) : () => {};
  }, [data])


  let added = data?.added?.length || null;
  let repeat = data?.repeat?.join(', ') || null;
  return (
    <div>
      <h1>Добавить занятия</h1>
      <input ref={ref} type='file' accept='.fit' id='create-workout-fit-inp' name="file" multiple/>
      {loading ? <AddWorkoutsLoader/> : error ? <div>Ошибка...</div> :
        <>
        {added ? <h3>{'Добавлено занятий: ' + added}</h3> : null}
        {repeat ? <h3>{'Такие тренировки существуют: ' + repeat}</h3> : null}
        </>}
    </div>
  );
};
