import { Fragment, FunctionComponent } from 'react'
import PlanWatcher from './plan.watcher'

import Loading from 'components/loading'
import { useWatcherLoading } from './watcher'
import RequestWatcher from './request.watcher'

export const AppWatcher: FunctionComponent = (props) => {
  const [loadingInfo] = useWatcherLoading()

  console.log('loadingInfo: ', loadingInfo)

  if (Object.values(loadingInfo).includes(true)) return <Loading />

  return (
    <Fragment>
      <RequestWatcher />
      <PlanWatcher />
      {props.children}
    </Fragment>
  )
}
