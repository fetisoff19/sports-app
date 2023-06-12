import {hideLoader, hideSmallLoader, setError, showLoader, showSmallLoader} from "../reducers/appReducer.js";
import {db, deleteWorkout} from "../../API/db.js";
import {
  addWorkout,
  changeWorkoutAction,
  deleteWorkoutAction, setOneWorkout,
  setWorkouts
} from "../reducers/workoutsReducer.js";
import axios from "axios";
import {API_URL} from "../../config/config";
import {parseFit} from "../../API/utils";

export function uploadFile(file, setState, dirId) {
  return async dispatch => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      if (dirId) {
        formData.append('parent', dirId)
      }
      const uploadFile = {name: file.name, progress: 0, id: Date.now()}
      // dispatch(addUploadFile(uploadFile))
      const response = await axios.post(`${API_URL}api/files/upload`, formData, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        onUploadProgress: progressEvent => {
          let totalLength = progressEvent.event.lengthComputable
            ? progressEvent.total
            : progressEvent.event.target.getResponseHeader('content-length')
            || progressEvent.event.target.getResponseHeader('x-decompressed-content-length');
          if (totalLength) {
            uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
            // dispatch(changeUploadFile(uploadFile))
            // console.log(uploadFile.progress)
          }
        }
      });

      dispatch(addWorkout(response.data))
      setState(prev => prev + 1)
      // console.log(response.data)
    } catch (e) {
      console.log(e?.response?.data?.message)
      alert(e?.response?.data?.message)
    }
  }
}

export function getFiles(dirId, sort) {
  return async dispatch => {
    try {
      console.log('getFiles')
      dispatch(showLoader())
      let url = `${API_URL}api/files`
      if (dirId) {
        url = `${API_URL}api/files?parent=${dirId}`
      }
      if (sort) {
        url = `${API_URL}api/files?sort=${sort}`
      }
      if (dirId && sort) {
        url = `${API_URL}api/files?parent=${dirId}&sort=${sort}`
      }
      const response = await axios.get(url, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      });
      // dispatch(setFiles(response.data))
      dispatch(setWorkouts(response.data.filter(file => file.type === "fit")))
      // const workouts = response.data.filter(file => file.path === 'workouts.txt')
      // workouts = workouts ?
      // dispatch(setWorkouts(response.data.filter(file => file.path === 'workouts.txt')))
    } catch (e) {
      console.log(e?.response?.data?.message)
      // alert(e?.response?.data?.message)
    } finally {
      dispatch(hideLoader())
    }
  }
}

export function getOneFile(_id){
  return async dispatch => {
    try {
      console.time('getOneFile')
      dispatch(showLoader())
      const response = await fetch(`${API_URL}api/files/download?id=${_id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.status === 200) {
        const blob = await response.blob()
        const parseFile = await parseFit(blob)
        dispatch(setOneWorkout(parseFile))
      }

    } catch (e) {
      console.log(e?.response?.data?.message)
      alert(e?.response?.data?.message)
    } finally {
      dispatch(hideLoader())
      console.timeEnd('getOneFile')
    }
  }
}

export function deleteOneWorkout(_id) {
  console.log('deleteOneWorkout')
  return async dispatch => {
    try {
      dispatch(showLoader());
      const response = await axios.delete(`${API_URL}api/files?id=${_id}`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.status === 200){
        dispatch(deleteWorkoutAction(_id))
      }
      return response.statusText
    } catch (e) {
      console.log(e)
      dispatch(setError(e))
    } finally {
      dispatch(hideLoader())
    }
  }
}



// export function getWorkouts() {
//   console.log('getWorkouts')
//   return async dispatch => {
//     try {
//       dispatch(showLoader())
//       setTimeout(() => {
//         getData()
//           .then((r) => dispatch(setWorkouts(r || []))
//         )
//       },0)
//     } catch (e) {
//       console.log(e)
//       dispatch(setError(e))
//     } finally {
//       dispatch(hideLoader())
//     }
//   }
// }

export function deleteAllWorkouts(workouts) {
  console.log('deleteAllWorkouts')
  return async dispatch => {
    try {
      let counter = workouts.length
      dispatch(showLoader());

      for (const workout of workouts) {
        const response = await axios.delete(`${API_URL}api/files?id=${workout._id}`,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.status === 200){
          counter--
        }
      }
      if(counter === 0){
        dispatch(setWorkouts([]))
        return 'OK'
      }
    } catch (e) {
      console.log(e)
      dispatch(setError(e))
    } finally {
      dispatch(hideLoader())
    }
  }
}


export function editWorkout(id, field, text) {
  return async dispatch => {
    try {
      dispatch(showSmallLoader(id));
      const response = await axios.post(`${API_URL}api/files/edit`, {
        id,
        field,
        text
      },{
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
      });
      if(response.status === 200)
        dispatch(changeWorkoutAction(response.data.workout))
    } catch (e) {
      console.log(e)
      dispatch(setError(e))
    } finally {
      dispatch(hideSmallLoader(id))
    }
  }
}

// export function getOneWorkout(id) {
//   console.log('getOneWorkout')
//   return async dispatch => {
//     try {
//       dispatch(showLoader());
//
//       await getDataForWorkout(id).then(r =>
//         dispatch(setOneWorkout(r)))
//
//     } catch (e) {
//       console.log(e)
//       dispatch(setError(e))
//     } finally {
//       dispatch(hideLoader())
//     }
//   }
// }

// async function getData() {
//   return await db.getAll('workouts')
//     .then(r => r.sort((a, b) => b.timestamp - a.timestamp))
// }




