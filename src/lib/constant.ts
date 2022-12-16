import bs58 from 'bs58'
import { BorshAccountsCoder } from '@project-serum/anchor'
import { IDL } from './the_share_prog'

export const DEFAULT_RPC_ENDPOINT = 'https://api.devnet.solana.com'
export const DEFAULT_PROGRAM_ID = '44u8zm9smwkMz67AVadCDAYWoMamNHkFbTnFad49EtVc'
export const DEFAULT_IDL = IDL

export const PLAN_DISCRIMINATOR = bs58.encode(
  BorshAccountsCoder.accountDiscriminator('plan'),
)

export const REQUEST_DISCRIMINATOR = bs58.encode(
  BorshAccountsCoder.accountDiscriminator('request'),
)
