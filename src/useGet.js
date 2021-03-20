import axios from 'axios'
import { useReducer, useEffect } from 'react'

const useGet = url => {
  const [data, dispatch] = useReducer(reducer, {
    loading: true,
    data: {}
  })

  useEffect(() => {
    dispatch({type: 'REQUEST'})
    axios
      .get(url)
      .then(res => {
        dispatch({type: 'SUCCESS', data: res.data})
      })
  },[url])
  return data
}
const reducer = (state, action) => {
  if (action.type === 'REQUEST') {
    return {
      ...state,
      loading: true
    }
  }
  if (action.type === 'SUCCESS') {
    return {
      ...state,
      loading: false,
      data: action.data
    }  
  }
}

export default useGet