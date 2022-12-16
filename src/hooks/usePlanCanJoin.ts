import { useWalletAddress } from '@sentre/senhub'
import { PlanData } from 'lib'
import { useCallback, useEffect, useState } from 'react'
import { usePlan } from './usePlan'

export const usePlanCanJoin = () => {
  const [canJoinPlan, setCanJoinPlan] = useState<
    (PlanData & { planAddress: string })[]
  >([])
  const plans = usePlan()
  const walletAddress = useWalletAddress()

  const handle = useCallback(() => {
    const data: (PlanData & { planAddress: string })[] = Object.keys(plans)
      .filter((keyPlan) => {
        const { withdrawerList } = plans[keyPlan]
        const index = withdrawerList.findIndex(
          (val) => val.toBase58() === walletAddress,
        )
        return index !== -1 ? true : false
      })
      .map((val) => ({ ...plans[val], planAddress: val }))

    setCanJoinPlan(data)
  }, [plans, walletAddress])

  useEffect(() => {
    handle()
  }, [handle])

  return canJoinPlan
}
