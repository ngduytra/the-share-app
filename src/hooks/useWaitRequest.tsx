import { RequestData } from 'lib'
import { useCallback, useEffect, useState } from 'react'

import { useRequest } from './useRequest'
import { useYourPlan } from './useYourPlan'

export const useWaitRequest = () => {
  const [waitRequest, setWaitRequest] = useState<
    (RequestData & { requestAddress: string })[]
  >([])
  const requests = useRequest()
  const plans = useYourPlan()

  const handle = useCallback(() => {
    const yourPlanAddress = Object.values(plans).map((plan) => plan.planAddress)

    const data = Object.keys(requests)
      .filter((keyRequest) => {
        const { plan } = requests[keyRequest]
        console.log('thong tin request', plan.toBase58())
        return yourPlanAddress.includes(plan.toBase58())
      })
      .map((val) => ({ ...requests[val], requestAddress: val }))

    setWaitRequest(data)
  }, [plans, requests])

  useEffect(() => {
    handle()
  }, [handle])

  return waitRequest
}
