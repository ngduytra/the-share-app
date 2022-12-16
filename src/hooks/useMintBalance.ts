import { utilsBN } from '@sen-use/web3'
import { BN, utils, web3 } from '@project-serum/anchor'
import { useCallback } from 'react'
import {
  useAccounts,
  useGetMintDecimals,
  useWalletAddress,
  useWalletBalance,
  util,
} from '@sentre/senhub'
import { DEFAULT_EMPTY_ADDRESS, DEFAULT_WSOL } from '@senswap/sen-js'

export const useMintBalance = () => {
  const walletAddress = useWalletAddress()
  const lamports = useWalletBalance()
  const getDecimals = useGetMintDecimals()
  const accounts = useAccounts()

  const buildResult = (
    mintAddress?: string,
    amount?: BN,
    decimals?: number,
  ) => {
    if (
      !util.isAddress(mintAddress) ||
      amount === undefined ||
      decimals === undefined
    )
      return { amount: new BN(0), decimals: 0, balance: 0 }
    return {
      mintAddress,
      amount,
      decimals,
      balance: Number(utilsBN.undecimalize(amount, decimals)),
    }
  }

  const getMintBalance = useCallback(
    async (addressToken: string, wrapSol: boolean = false) => {
      if (!util.isAddress(walletAddress) || !util.isAddress(addressToken))
        return buildResult()
      try {
        const accountAddress = await utils.token
          .associatedAddress({
            mint: new web3.PublicKey(addressToken),
            owner: new web3.PublicKey(walletAddress),
          })
          .then((r) => r.toBase58())

        const isWsolAddress = addressToken === DEFAULT_WSOL
        const isSolAddress = accountAddress === walletAddress
        if (isSolAddress || isWsolAddress) {
          const { amount = BigInt(0) } = accounts[accountAddress] || {}
          const mintAddress = isWsolAddress
            ? DEFAULT_WSOL
            : DEFAULT_EMPTY_ADDRESS
          const returnedBalance = isWsolAddress
            ? new BN(amount?.toString() || 0)
            : new BN(lamports?.toString() || 0)

          if (wrapSol)
            return buildResult(
              mintAddress,
              new BN(lamports?.toString() || 0 + amount?.toString() || 0),
              9,
            )

          return buildResult(mintAddress, returnedBalance, 9)
        }
        const { amount, mint: mintAddress } = accounts[accountAddress] || {}
        const decimals = await getDecimals({ mintAddress })

        return buildResult(
          mintAddress,
          new BN(amount?.toString() || 0),
          decimals,
        )
      } catch (er) {
        return buildResult()
      }
    },
    [accounts, getDecimals, lamports, walletAddress],
  )

  return { getMintBalance }
}
