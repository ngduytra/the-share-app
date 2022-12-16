import bs58 from 'bs58'
import { BorshAccountsCoder } from '@project-serum/anchor'
import { IDL } from './the_share_prog'

export const DEFAULT_RPC_ENDPOINT = 'https://api.devnet.solana.com'
export const DEFAULT_PROGRAM_ID = 'CGvPBsRDLFxd4YaKcgfJFpWMHo5vc8DGdpJNfH9b9y87'
export const DEFAULT_IDL = IDL

export const PLAN_DISCRIMINATOR = bs58.encode(
  BorshAccountsCoder.accountDiscriminator('plan'),
)

export const REQUEST_DISCRIMINATOR = bs58.encode(
  BorshAccountsCoder.accountDiscriminator('request'),
)
