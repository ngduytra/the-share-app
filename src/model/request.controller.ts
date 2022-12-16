import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account } from '@senswap/sen-js'
import { RequestData, theShareProgram } from 'lib'

/**
 * Interface & Utility
 */

export type RequestState = Record<string, RequestData>

/**
 * Store constructor
 */

const NAME = 'request'
const initialState: RequestState = {}

/**
 * Actions
 */

export const fetchRequests = createAsyncThunk(
  `${NAME}/fetchRequests`,
  async () => {
    const bulk: Record<string, RequestData> = {}
    const requestData = await theShareProgram.getAllRequest()
    for (const request of requestData) {
      bulk[request.publicKey.toBase58()] = request.account as any
    }

    return bulk
  },
)

export const upsetRequest = createAsyncThunk<
  RequestState,
  { address: string; data: any },
  { state: any }
>(`${NAME}/upsetPlan`, async ({ address, data }) => {
  if (!account.isAddress(address)) throw new Error('Invalid request address')
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
        fetchRequests.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        upsetRequest.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
