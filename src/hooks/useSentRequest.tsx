import { useWalletAddress } from '@sentre/senhub'
import { RequestData } from 'lib'
import { useCallback, useEffect, useState } from 'react'

import { useRequest } from './useRequest'

export const useSentRequest = () => {
  const [sentRequest, setSentRequest] = useState<
    (RequestData & { requestAddress: string })[]
  >([])
  const requests = useRequest()
  const walletAddress = useWalletAddress()

  const handle = useCallback(() => {
    const data = Object.keys(requests)
      .filter((keyRequest) => {
        const { withdrawer } = requests[keyRequest]
        return withdrawer.toBase58() === walletAddress
      })
      .map((val) => ({ ...requests[val], requestAddress: val }))

    setSentRequest(data)
  }, [requests, walletAddress])

  useEffect(() => {
    handle()
  }, [handle])

  return sentRequest
}
