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
import {logout} from "../reducers/userReducer";

export function uploadFile(file) {
  return async dispatch => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      // const uploadFile = {name: file.name, progress: 0, id: Date.now()}
      // dispatch(addUploadFile(uploadFile))
      const response = await axios.post(`${API_URL}api/files/upload`, formData, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        // onUploadProgress: progressEvent => {
        //   let totalLength = progressEvent.event.lengthComputable
        //     ? progressEvent.total
        //     : progressEvent.event.target.getResponseHeader('content-length')
        //     || progressEvent.event.target.getResponseHeader('x-decompressed-content-length');
        //   if (totalLength) {
        //     uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
            // dispatch(changeUploadFile(uploadFile))
            // console.log(uploadFile.progress)
        //   }
        // }
      });
      dispatch(addWorkout(response.data))
    } catch (e) {
      if(e.response.status === 400){
        dispatch(addWorkout(e.response.data?.message))
      }
      else if(e.response.status === 500){
        console.log("server error", e?.response)
        dispatch(addWorkout("error"))
      }
      else {
        dispatch(addWorkout("unknown error"))
        console.log("unknown error", e.response)
      }
    }
  }
}

export function getFiles(sport, sort, direction) {
  return async dispatch => {
    try {
      console.log('getFiles', sport, sort, direction)
      dispatch(showLoader())
      let url = `${API_URL}api/files`
      if (sport) {
        url = `${API_URL}api/files?sport=${sport}`
      }
      if (direction && sort) {
        url = `${API_URL}api/files?direction=${direction}&sort=${sort}`
      }
      if (direction && sort && sport) {
        url = `${API_URL}api/files?direction=${direction}&sort=${sort}&sport=${sport}`
      }
      const response = await axios.get(url, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      });
      // dispatch(setFiles(response.data))

      dispatch(setWorkouts(response.data))
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
      // dispatch(showSmallLoader());
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
      // dispatch(hideSmallLoader())
    }
  }
}


export function deleteAllWorkouts() {
  console.log('deleteAllWorkouts')
  return async dispatch => {
    try {
      dispatch(showLoader());
      const response = await axios.delete(`${API_URL}api/files/all`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.status === 200){
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

export function deleteUserFiles() {
  console.log('deleteUserFiles')
  return async dispatch => {
    try {
      dispatch(showLoader());
      const response = await axios.delete(`${API_URL}api/files/user`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.status === 200){
        dispatch(dispatch(logout()))
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





