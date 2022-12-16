import { AppState } from 'model'
import { useSelector } from 'react-redux'

export const usePlan = () => {
  const plan = useSelector((state: AppState) => state.plan)

  return plan
}
