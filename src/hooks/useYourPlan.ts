import { useWalletAddress } from '@sentre/senhub'
import { PlanData } from 'lib'
import { useCallback, useEffect, useState } from 'react'
import { usePlan } from './usePlan'

export const useYourPlan = () => {
  const [canYourPlan, setYourPlan] = useState<
    (PlanData & { planAddress: string })[]
  >([])
  const plans = usePlan()
  const walletAddress = useWalletAddress()

  const handle = useCallback(() => {
    const data = Object.keys(plans)
      .filter((keyPlan) => {
        const { planer } = plans[keyPlan]

        return planer.toBase58() === walletAddress
      })
      .map((val) => ({ ...plans[val], planAddress: val }))

    setYourPlan(data)
  }, [plans, walletAddress])

  useEffect(() => {
    handle()
  }, [handle])

  return canYourPlan
}
