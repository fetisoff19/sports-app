import {hideLoader, setError, showLoader} from "../reducers/appReducer";
import {db, deleteWorkout} from "../API/db";
import {
  changeWorkoutAction,
  deleteWorkoutAction, setOneWorkout,
  setWorkouts
} from "../reducers/workoutsReducer";
import {getDataForPowerCurveAllTime} from "../components/ViewWorkout/functions/functions";

export function getWorkouts() {
  console.log('getWorkouts')
  return async dispatch => {
    try {
      dispatch(showLoader())
      setTimeout(() => {
        getData()
          .then((r) => dispatch(setWorkouts(r || []))
        )
      },0)
    } catch (e) {
      console.log(e)
      dispatch(setError(e))
    } finally {
      dispatch(hideLoader())
    }
  }
}

export function deleteAllWorkouts(workouts) {
  console.log('deleteAllWorkouts')
  return async dispatch => {
    try {
      dispatch(showLoader())
      deleteAll(workouts)
        .then(() => dispatch(setWorkouts([])))
    } catch (e) {
      console.log(e)
      dispatch(setError(e))
    } finally {
      dispatch(hideLoader())
    }
  }
}

export function deleteOneWorkout(id) {
  console.log('deleteOneWorkout')
  return async dispatch => {
    try {
      dispatch(showLoader());
      deleteWorkout(+id)
       .then(() => dispatch(deleteWorkoutAction(id)))
    } catch (e) {
      console.log(e)
      dispatch(setError(e))
    } finally {
      dispatch(hideLoader())
    }
  }
}

export function changeWorkout(id, field, value) {
  console.log('changeWorkout')
  return async dispatch => {
    try {
      dispatch(showLoader());
      await db.get('workouts', id).then(r => {
        r.dateEdit = new Date;
        r[field]= value;
        db.put('workouts', r)
        dispatch(changeWorkoutAction(r));})
    } catch (e) {
      console.log(e)
      dispatch(setError(e))
    } finally {
      dispatch(hideLoader())
    }
  }
}

export function getOneWorkout(id) {
  console.log('getWorkout')
  return async dispatch => {
    try {
      dispatch(showLoader());
      await getDataForWorkout(id).then(r =>
        dispatch(setOneWorkout(r)))
    } catch (e) {
      console.log(e)
      dispatch(setError(e))
    } finally {
      dispatch(hideLoader())
    }
  }
}

async function getData() {
  return await db.getAll('workouts')
    .then(r => r.sort((a, b) => b.timestamp - a.timestamp))
}

async function deleteAll(workouts) {
  for await(const workout of workouts) {
    await deleteWorkout(workout.id);
  }
}

async function getDataForWorkout(id){
  let result = await db.get('workoutsData', id);
  let wt = await db.get('workouts', id)
  wt.powerCurve ? await getDataForPowerCurveAllTime(wt.powerCurve)
    .then(r => {
      wt.powerCurveAllTime = r[0];
      wt.powerCurveAllTimeMap = r[1];
    }) : null;
  return result || wt ? {...result, workout: wt} : null;
}



