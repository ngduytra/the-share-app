import { AppState } from 'model'
import { useSelector } from 'react-redux'

export const useRequest = () => {
  const request = useSelector((state: AppState) => state.request)

  console.log('thong tin request=>', request)
  return request
}
