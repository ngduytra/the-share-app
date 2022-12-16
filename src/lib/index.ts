import { getAnchorProvider } from '@sentre/senhub'

import { DEFAULT_PROGRAM_ID } from './constant'
import TheShareAmm from './core'

export * from './constant'
export * from './types'
export * from './utils'
export * from './core'

const provider = getAnchorProvider()!
export const theShareProgram = new TheShareAmm(
  provider as any,
  DEFAULT_PROGRAM_ID,
)
