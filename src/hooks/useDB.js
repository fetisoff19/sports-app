import {useEffect, useState} from "react";

export default function (request, deps) {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      request()
        .then(response => setData(response))
        .catch(error => setError(error))
        .finally(() => {
          setLoading(false)})
    },200)

  }, [deps])
  return [data, loading, error]
}