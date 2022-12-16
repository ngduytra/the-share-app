import { IdlAccounts, Idl } from '@project-serum/anchor'
import { IdlEvent } from '@project-serum/anchor/dist/cjs/idl'
import { TypeDef } from '@project-serum/anchor/dist/cjs/program/namespace/types'
import { Wallet } from '@project-serum/anchor/dist/cjs/provider'
import { TheShareProg } from './the_share_prog'

export type TheShareAmmProgIdl = TheShareProg

export type AnchorWallet = Wallet

export type PlanData = IdlAccounts<TheShareAmmProgIdl>['plan']
export type RequestData = IdlAccounts<TheShareAmmProgIdl>['request']

type TypeDefDictionary<T extends IdlEvent[], Defined> = {
  [K in T[number]['name']]: TypeDef<
    {
      name: K
      type: {
        kind: 'struct'
        fields: Extract<T[number], { name: K }>['fields']
      }
    },
    Defined
  >
}
type IdlEvents<T extends Idl> = TypeDefDictionary<
  NonNullable<T['events']>,
  Record<string, never>
>
export type TheShareAmmProgEvents = IdlEvents<TheShareAmmProgIdl>
