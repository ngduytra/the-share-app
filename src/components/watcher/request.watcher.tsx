import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { web3 } from '@project-serum/anchor'

import Watcher from './watcher'
import { fetchRequests, upsetRequest } from 'model/request.controller'
import { theShareProgram } from 'lib'

// TODO: Config
const NAME = 'request'
const FILTER: web3.GetProgramAccountsFilter[] = []

const RequestWatcher = () => {
  const dispatch = useDispatch()

  // TODO: init all account data
  const init = useCallback(async () => {
    dispatch(fetchRequests())
  }, [dispatch])
  // TODO: upset account data
  const upset = useCallback(
    (key: string, value: any) =>
      dispatch(upsetRequest({ address: key, data: value })),
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
export default RequestWatcher
