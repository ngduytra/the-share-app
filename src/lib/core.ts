import { web3, Program, utils, BN, AnchorProvider } from '@project-serum/anchor'

import { DEFAULT_PROGRAM_ID, DEFAULT_IDL } from './constant'
import {
  TheShareAmmProgIdl,
  TheShareAmmProgEvents,
  PlanData,
  RequestData,
} from './types'
import { isAddress } from './utils'

class TheShareAmm {
  private _connection: web3.Connection
  private _provider: AnchorProvider
  readonly program: Program<TheShareAmmProgIdl>

  constructor(
    provider: AnchorProvider,
    programId: string = DEFAULT_PROGRAM_ID,
  ) {
    if (!isAddress(programId)) throw new Error('Invalid program id')
    // Private
    this._connection = provider.connection
    this._provider = provider
    // Public
    this.program = new Program<TheShareAmmProgIdl>(
      DEFAULT_IDL,
      programId,
      this._provider,
    )
  }

  /**
   * Get list of event names
   */
  get events() {
    return this.program.idl.events.map(({ name }) => name)
  }

  /**
   * Listen changes on an event
   * @param eventName Event name
   * @param callback Event handler
   * @returns Listener id
   */
  addListener = <T extends keyof TheShareAmmProgEvents>(
    eventName: T,
    callback: (data: TheShareAmmProgEvents[T]) => void,
  ) => {
    return this.program.addEventListener(
      eventName as string,
      (data: TheShareAmmProgEvents[T]) => callback(data),
    )
  }

  /**
   * Remove listener by its id
   * @param listenerId Listener id
   * @returns
   */
  removeListener = async (listenerId: number) => {
    try {
      await this.program.removeEventListener(listenerId)
    } catch (er: any) {
      console.warn(er.message)
    }
  }

  /**
   * Parse plan buffer data.
   * @param data Plan buffer data.
   * @returns Plan readable data.
   */
  parsePlanData = (data: Buffer): PlanData => {
    return this.program.coder.accounts.decode('plan', data)
  }

  /**
   * Parse request buffer data.
   * @param data Request buffer data.
   * @returns Request readable data.
   */
  parseRequestData = (data: Buffer): RequestData => {
    return this.program.coder.accounts.decode('request', data)
  }

  /**
   * Get all plan.
   * @param
   * @returns Plan readable data.
   */
  getAllPlan = async () => {
    return this.program.account.plan.all()
  }

  /**
   * Get all request.
   * @param
   * @returns Request readable data.
   */
  getAllRequest = async () => {
    return this.program.account.request.all()
  }

  /**
   * Get plan data.
   * @param planAddress Plan address.
   * @returns Plan readable data.
   */
  getPlanData = async (planAddress: string): Promise<PlanData> => {
    return this.program.account.plan.fetch(planAddress)
  }
  /**
   * Get request data.
   * @param requestAddress Request address.
   * @returns Request readable data.
   */
  getRequestData = async (requestAddress: string): Promise<RequestData> => {
    return this.program.account.request.fetch(requestAddress) as any
  }

  /**
   * Derive treasurer address of a plan.
   * @param planAddress The plan address.
   * @returns Treasurer address that holds the secure token treasuries of the plan.
   */
  deriveTreasurerAddress = async (address: string) => {
    if (!isAddress(address)) throw new Error('Invalid plan address')
    const [treasurerPublicKey] = await web3.PublicKey.findProgramAddress(
      [Buffer.from('treasurer'), new web3.PublicKey(address).toBuffer()],
      this.program.programId,
    )
    return treasurerPublicKey.toBase58()
  }

  /**
   * Create a new plan
   * @param opt.fund Total fund of plan
   * @param opt.planName Name of the plan
   * @param opt.withdrawerList Withdrawer List
   * @param opt.xTokenAddress X mint address
   * @param opt.yTokenAddress Y mint address
   * @param opt.plan (Optional) Plan keypair
   * @param sendAndConfirm (Optional) Send and confirm the transaction immediately.
   * @returns { tx, txId, poolAddress }
   */
  createPlan = async (
    {
      fund,
      planName,
      withdrawerList,
      tokenAddress,
      plan = web3.Keypair.generate(),
    }: {
      fund: BN
      planName: string
      withdrawerList: string[]
      tokenAddress: string
      plan?: web3.Keypair
    },
    sendAndConfirm = true,
  ) => {
    if (!isAddress(tokenAddress)) throw new Error('Invalid token address')
    if (!fund.gt(new BN(0)))
      throw new Error('Token amounts must be greater than zero')

    const tokenPublicKey = new web3.PublicKey(tokenAddress)
    const withdrawerPubkeyList = withdrawerList.map(
      (withdrawer) => new web3.PublicKey(withdrawer),
    )

    const accountPublicKey = await utils.token.associatedAddress({
      mint: tokenPublicKey,
      owner: this._provider.wallet.publicKey,
    })

    const treasurerAddress = await this.deriveTreasurerAddress(
      plan.publicKey.toBase58(),
    )
    const treasurerPublicKey = new web3.PublicKey(treasurerAddress)
    const treasuryPublicKey = await utils.token.associatedAddress({
      mint: tokenPublicKey,
      owner: treasurerPublicKey,
    })

    const builder = this.program.methods
      .createPlan(fund, planName, withdrawerPubkeyList)
      .accounts({
        planer: this._provider.wallet.publicKey,
        plan: plan.publicKey,
        token: tokenPublicKey,
        treasurer: treasurerPublicKey,
        ataPlaner: accountPublicKey,
        treasury: treasuryPublicKey,

        systemProgram: web3.SystemProgram.programId,
        tokenProgram: utils.token.TOKEN_PROGRAM_ID,
        associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
        rent: web3.SYSVAR_RENT_PUBKEY,
      })
      .signers([plan])

    const tx = await builder.transaction()
    const txId = sendAndConfirm
      ? await builder.rpc({ commitment: 'confirmed' })
      : ''

    return { tx, txId, planAddress: plan.publicKey.toBase58() }
  }

  changePlanConfigs = async (
    {
      fund,
      planName,
      withdrawerList,
      planAddress,
    }: {
      fund: BN
      planName: string
      withdrawerList: string[]
      planAddress: string
    },
    sendAndConfirm = true,
  ) => {
    if (!isAddress(planAddress)) throw new Error('Invalid pool address')
    if (!fund.gt(new BN(0)))
      throw new Error('The token amount must be greater than zero')

    const withdrawerPubkeyList = withdrawerList.map(
      (withdrawer) => new web3.PublicKey(withdrawer),
    )

    const planPublicKey = new web3.PublicKey(planAddress)
    const { token, planer } = await this.getPlanData(planAddress)
    if (!planer.equals(this._provider.wallet.publicKey))
      throw Error('You have no permission')
    const ataPlaner = await utils.token.associatedAddress({
      mint: token,
      owner: this._provider.wallet.publicKey,
    })

    const treasurerAddress = await this.deriveTreasurerAddress(planAddress)
    const treasurerPublicKey = new web3.PublicKey(treasurerAddress)
    const treasuryPublicKey = await utils.token.associatedAddress({
      mint: token,
      owner: treasurerPublicKey,
    })

    const builder = this.program.methods
      .changePlanConfigs(fund, planName, withdrawerPubkeyList)
      .accounts({
        planer: this._provider.wallet.publicKey,
        plan: planPublicKey,
        ataPlaner,
        treasury: treasuryPublicKey,

        systemProgram: web3.SystemProgram.programId,
        tokenProgram: utils.token.TOKEN_PROGRAM_ID,
      })

    const tx = await builder.transaction()
    const txId = sendAndConfirm
      ? await builder.rpc({ commitment: 'confirmed' })
      : ''

    return { tx, txId }
  }

  createRequest = async (
    {
      amount,
      reason,
      planAddress,
      request = web3.Keypair.generate(),
    }: {
      amount: BN
      reason: string
      planAddress: string
      request?: web3.Keypair
    },
    sendAndConfirm = true,
  ) => {
    if (!isAddress(planAddress)) throw new Error('Invalid plan address')
    const { fund, withdrawerList } = await this.getPlanData(planAddress)
    if (!amount.gt(new BN(0)) || fund.lt(amount))
      throw new Error('The token amount is invalid')

    const withdrawerIndex = withdrawerList.findIndex((wt) =>
      wt.equals(this._provider.wallet.publicKey),
    )

    if (withdrawerIndex === -1) throw Error('You have no permission')

    const planPublicKey = new web3.PublicKey(planAddress)

    const builder = this.program.methods
      .createRequest(amount, reason)
      .accounts({
        withdrawer: this._provider.wallet.publicKey,
        plan: planPublicKey,
        request: request.publicKey,

        systemProgram: web3.SystemProgram.programId,
        rent: web3.SYSVAR_RENT_PUBKEY,
      })
      .signers([request])

    const tx = await builder.transaction()
    const txId = sendAndConfirm
      ? await builder.rpc({ commitment: 'confirmed' })
      : ''

    return { tx, txId }
  }

  changeRequest = async (
    {
      amount,
      reason,
      requestAddress,
    }: {
      amount: BN
      reason: string
      requestAddress: string
    },
    sendAndConfirm = true,
  ) => {
    if (!isAddress(requestAddress)) throw new Error('Invalid request address')
    const { plan } = await this.getRequestData(requestAddress)
    const { fund, withdrawerList } = await this.getPlanData(plan.toBase58())
    if (!amount.gt(new BN(0)) || fund.lt(amount))
      throw new Error('The token amount is invalid')

    const withdrawerIndex = withdrawerList.findIndex((wt) =>
      wt.equals(this._provider.wallet.publicKey),
    )

    if (withdrawerIndex === -1) throw Error('You have no permission')

    const requestPublicKey = new web3.PublicKey(requestAddress)

    const builder = this.program.methods
      .changeRequest(amount, reason)
      .accounts({
        withdrawer: this._provider.wallet.publicKey,
        plan,
        request: requestPublicKey,

        systemProgram: web3.SystemProgram.programId,
      })

    const tx = await builder.transaction()
    const txId = sendAndConfirm
      ? await builder.rpc({ commitment: 'confirmed' })
      : ''

    return { tx, txId }
  }

  cancelRequest = async (
    {
      requestAddress,
    }: {
      requestAddress: string
    },
    sendAndConfirm = true,
  ) => {
    if (!isAddress(requestAddress)) throw new Error('Invalid request address')
    const { plan } = await this.getRequestData(requestAddress)
    const { withdrawerList } = await this.getPlanData(plan.toBase58())

    const withdrawerIndex = withdrawerList.findIndex((wt) =>
      wt.equals(this._provider.wallet.publicKey),
    )

    if (withdrawerIndex === -1) throw Error('You have no permission')

    const requestPublicKey = new web3.PublicKey(requestAddress)

    const builder = this.program.methods.cancelRequest().accounts({
      withdrawer: this._provider.wallet.publicKey,
      plan,
      request: requestPublicKey,

      systemProgram: web3.SystemProgram.programId,
    })

    const tx = await builder.transaction()
    const txId = sendAndConfirm
      ? await builder.rpc({ commitment: 'confirmed' })
      : ''

    return { tx, txId }
  }

  rejectRequest = async (
    {
      requestAddress,
    }: {
      requestAddress: string
    },
    sendAndConfirm = true,
  ) => {
    if (!isAddress(requestAddress)) throw new Error('Invalid request address')
    const { plan } = await this.getRequestData(requestAddress)

    const requestPublicKey = new web3.PublicKey(requestAddress)

    const builder = this.program.methods.rejectRequest().accounts({
      planer: this._provider.wallet.publicKey,
      plan,
      request: requestPublicKey,

      systemProgram: web3.SystemProgram.programId,
    })

    const tx = await builder.transaction()
    const txId = sendAndConfirm
      ? await builder.rpc({ commitment: 'confirmed' })
      : ''

    return { tx, txId }
  }

  acceptRequest = async (
    {
      requestAddress,
    }: {
      requestAddress: string
    },
    sendAndConfirm = true,
  ) => {
    if (!isAddress(requestAddress)) throw new Error('Invalid request address')
    const { plan, withdrawer, amount } = await this.getRequestData(
      requestAddress,
    )
    const { token, fund } = await this.getPlanData(plan.toBase58())
    if (fund.lt(amount)) throw Error('You have no longer fund enough')

    const requestPublicKey = new web3.PublicKey(requestAddress)

    const ataPlaner = await utils.token.associatedAddress({
      mint: token,
      owner: this._provider.wallet.publicKey,
    })

    const ataRequester = await utils.token.associatedAddress({
      mint: token,
      owner: withdrawer,
    })

    const builder = this.program.methods.acceptRequest().accounts({
      planer: this._provider.wallet.publicKey,
      plan,
      request: requestPublicKey,
      ataPlaner,
      ataRequester,

      systemProgram: web3.SystemProgram.programId,
      tokenProgram: utils.token.TOKEN_PROGRAM_ID,
    })

    const tx = await builder.transaction()
    const txId = sendAndConfirm
      ? await builder.rpc({ commitment: 'confirmed' })
      : ''

    return { tx, txId }
  }
}

export default TheShareAmm
