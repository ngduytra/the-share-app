import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { web3 } from '@project-serum/anchor'

import Watcher from './watcher'
import { fetchPlans, upsetPlan } from 'model/plan.controller'
import { theShareProgram } from 'lib'

// TODO: Config
const NAME = 'plan'
const FILTER: web3.GetProgramAccountsFilter[] = []

const PlanWatcher = () => {
  const dispatch = useDispatch()

  // TODO: init all account data
  const init = useCallback(async () => {
    dispatch(fetchPlans())
  }, [dispatch])
  // TODO: upset account data
  const upset = useCallback(
    (key: string, value: any) =>
      dispatch(upsetPlan({ address: key, data: value })),
    [dispatch],
  )

  return (
    <Watcher
      program={theShareProgram.program}
      name={NAME}
      filter={FILTER}
      init={init}
      upset={upset}
    />
  )
}
export default PlanWatcher
