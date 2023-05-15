import {useEffect, useState} from "react";

export default function (target, f) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (target) {
      const add = e => {
        if(e.target.files.length){
          setLoading(true)
          f(e)
            .then(response => setData(response))
            .catch(error => setError(error))
            .finally(() => setLoading(false))
        }
      }
      target.addEventListener('change', add)

      return () => {
        target.removeEventListener('change', add)
      }
    }
  })

  return [data, loading, error]
}