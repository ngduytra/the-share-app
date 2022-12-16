import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account } from '@senswap/sen-js'
import { PlanData, theShareProgram } from 'lib'

/**
 * Interface & Utility
 */

export type PlanState = Record<string, PlanData>

/**
 * Store constructor
 */

const NAME = 'plan'
const initialState: PlanState = {}

/**
 * Actions
 */

export const fetchPlans = createAsyncThunk(`${NAME}/fetchPlans`, async () => {
  const bulk: Record<string, PlanData> = {}
  const planData = await theShareProgram.getAllPlan()
  for (const plan of planData) {
    bulk[plan.publicKey.toBase58()] = plan.account
  }
  console.log('thong tin plan =>', bulk)

  return bulk
})

export const upsetPlan = createAsyncThunk<
  PlanState,
  { address: string; data: any },
  { state: any }
>(`${NAME}/upsetPlan`, async ({ address, data }) => {
  if (!account.isAddress(address)) throw new Error('Invalid plan address')
  if (!data) throw new Error('Data is empty')
  return { [address]: data }
})

/**
 * Usual procedure
 */

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder
      .addCase(
        fetchPlans.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        upsetPlan.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
