import {
  hideLoader,
  hideSmallLoader,
  setError,
  showLoader,
  showSmallLoader
} from "../reducers/appReducer.js";
import {
  addChartsData,
  addPolyline, addPowerCurve,
  addWorkout, addWorkouts,
  changeWorkoutAction,
  deleteWorkoutAction, setNumberOfFiles, setOneWorkout,
  setWorkouts
} from "../reducers/workoutsReducer.js";
import axios from "axios";
import {API_URL} from "../../config/config";
import {parseFit} from "../../API/utils";
import {logout} from "../reducers/userReducer";
import {addSport, removeSport, setSports} from "../reducers/workoutsListReducer";
import {auth} from "./user";

// export function uploadFile(file) {
//   return async dispatch => {
//     try {
//       const formData = new FormData()
//       formData.append('file', file)
//       // const uploadFile = {name: file.name, progress: 0, id: Date.now()}
//       // dispatch(addUploadFile(uploadFile))
//       const response = await axios.post(`${API_URL}api/files/upload`, formData, {
//         headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
//         // onUploadProgress: progressEvent => {
//         //   let totalLength = progressEvent.event.lengthComputable
//         //     ? progressEvent.total
//         //     : progressEvent.event.target.getResponseHeader('content-length')
//         //     || progressEvent.event.target.getResponseHeader('x-decompressed-content-length');
//         //   if (totalLength) {
//         //     uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
//             // dispatch(changeUploadFile(uploadFile))
//             // console.log(uploadFile.progress)
//         //   }
//         // }
//       });
//       dispatch(addWorkout(response.data))
//       dispatch(addSport(response.data.sport))
//     } catch (e) {
//       if(e?.response?.status === 400){
//         dispatch(addWorkout(e.response.data?.message))
//       }
//       else if(e?.response?.status === 500){
//         console.log("server error", e?.response)
//         dispatch(addWorkout("error"))
//       }
//       else {
//         dispatch(addWorkout("unknown error"))
//         console.log("unknown error", e)
//       }
//     } finally {
//     }
//   }
// }


export function uploadFile(files) {
  return async dispatch => {

    async function upload(file){

      try {
        const formData = new FormData()
        formData.append('file', file)
        const response = await axios.post(`${API_URL}api/files/upload`, formData, {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        });
        dispatch(addWorkout(response.data))
        dispatch(addSport(response.data.sport))
      } catch (e) {
        if (e?.response?.status === 400) {
          dispatch(addWorkout(e.response.data?.message))
        } else if (e?.response?.status === 500) {
          console.log("server error", e?.response)
          dispatch(addWorkout("error"))
        } else {
          dispatch(addWorkout("unknown error"))
          console.log("unknown error", e)
        }
      }
    }
    let time = Date.now();
    for (const file of files) {
      const index = files.indexOf(file);
      await upload(file)
        .then(() => console.log(index, Date.now() - time));
    }
  }
}

export function getFiles(sport, sort, direction, page, limit, search, _id) {
  return async dispatch => {
    try {
      console.log('get')
      dispatch(showLoader())

      let url = `${API_URL}api/files`

      sport = sport ? `sport=${sport}&` : ''
      sort = sort ? `sort=${sort}&` : ''
      direction = direction ? `direction=${direction}&` : ''
      let pageNum = page ? `page=${page}&` : ''
      limit = limit ? `limit=${limit}&` : ''
      search = search ? `search=${search}&` : ''
      _id = _id ? `id=${_id}` : ''

      if(sport || sort || direction || pageNum || limit || search){
        url = url + '?' + sport + sort + direction + pageNum + limit + search + _id
      }

      const response = await axios.get(url, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      });
      dispatch(setNumberOfFiles(response.headers['file-length']))
      if(page === 1){
        dispatch(setWorkouts(response.data))
      } else {
        dispatch(addWorkouts(response.data))
      }
      // console.timeEnd(a)
     } catch (e) {
      console.log(e?.response?.data?.message)
    } finally {
      dispatch(hideLoader())
    }
  }
}


export function getOneFile(_id){
  return async dispatch => {
    try {
      // console.time('getOneFile')
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
        dispatch(addSport(parseFile.sport))
      }

    } catch (e) {
      console.log(e?.response?.data?.message)
      alert(e?.response?.data?.message)
    } finally {
      dispatch(hideLoader())
      // console.timeEnd('getOneFile')
    }
  }
}

export function getPolyline(_id){
  return async dispatch => {
    try {
        const response = await axios.get(`${API_URL}api/files/polyline?id=${_id}`,
          {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        });
      dispatch(addPolyline(response.data))
    } catch (e) {
      console.log(e?.response?.data?.message)
    } finally {
    }
  }
}

export function getChartsData(_id){
  return async dispatch => {
    try {
      dispatch(showLoader());
      const response = await axios.get(`${API_URL}api/files/chartsdata?id=${_id}`,
        {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        });
      dispatch(addChartsData(response.data))
    } catch (e) {
      console.log(e?.response?.data?.message)
    } finally {
      dispatch(hideLoader())
    }
  }
}

export function getPowerCurve(_id){
  return async dispatch => {
    // dispatch(showLoader());
    try {
      const response = await axios.get(`${API_URL}api/files/powercurve?id=${_id}`,
        {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        });
      dispatch(addPowerCurve(response.data))
    } catch (e) {
      console.log(e?.response?.data?.message)
    } finally {
      // dispatch(hideLoader())
    }
  }
}

export function deleteOneWorkout(_id, key) {
  console.log('deleteOneWorkout')
  return async dispatch => {
    try {
      dispatch(showSmallLoader(_id + key));
      const response = await axios.delete(`${API_URL}api/files?id=${_id}`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response)
      if (response.status === 200){
        dispatch(deleteWorkoutAction(_id))
        dispatch(removeSport(_id))
      }
      return response.statusText
    } catch (e) {
      console.log(e)
      dispatch(setError(e))
    } finally {
      dispatch(auth())
      dispatch(hideSmallLoader())
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
        dispatch(setSports([]))
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
      dispatch(auth())
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





