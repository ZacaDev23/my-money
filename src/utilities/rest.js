import { useReducer, useEffect } from 'react'
import axios from 'axios'

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

const INITIAL_PARAMS = { loading: true, data: {} }

const init = baseURL => {
  const useGet = resource => {
    const [data, dispatch] = useReducer(reducer, INITIAL_PARAMS)
    const carregar = async() => {
      dispatch({ type: 'REQUEST' })
      const res = await axios.get(baseURL + resource + '.json')
      dispatch({ type: 'SUCCESS', data: res.data })
    }
    useEffect(() => {
      carregar()
    }, [resource])
    return {
      ...data,
      refetch: carregar
    }
  }

  const usePost = resource => {
    const [data, dispatch] = useReducer(reducer, INITIAL_PARAMS)
    const post = async (data) => {
      dispatch({ type: 'REQUEST' })
      const res = await axios.post(baseURL + resource + '.json', data)
      dispatch({
        type: 'SUCCESS',
        data: res.data
      })
    }
    return [data, post]
  }

  const useDelete = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_PARAMS)

    const remove = async(url) => {
      dispatch({ type: 'REQUEST' })
      await axios.delete(baseURL + url + '.json')      
      dispatch({
        type: 'SUCCESS'
      })
    }
    return [data, remove]
  }

  const usePatch = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_PARAMS)

    const patch = async(resource, data) => {
      dispatch({type: 'REQUEST'})
      await axios.patch(baseURL + resource + '.json', data)
      dispatch({
        type: 'SUCCESS'
      })
    }
    return[data, patch]
  }

  return {
    useGet,
    usePost,
    useDelete,
    usePatch
  }
}

export default init