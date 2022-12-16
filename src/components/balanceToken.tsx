import { Space, Typography } from 'antd'
import { useMintBalance } from 'hooks/useMintBalance'
import { useState, useCallback, useEffect } from 'react'

const BalanceToken = ({ mint }: { mint: string }) => {
  const [balance, setBalance] = useState(0)
  const { getMintBalance } = useMintBalance()

  const getBalance = useCallback(async () => {
    const { balance: newBalance } = await getMintBalance(mint)
    setBalance(newBalance)
  }, [getMintBalance, mint])

  useEffect(() => {
    getBalance()
  }, [getBalance])

  return (
    <Space>
      <Typography.Text>{balance}</Typography.Text>
    </Space>
  )
}

export default BalanceToken
