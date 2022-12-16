import { Tooltip, Tag, Button } from 'antd'
import { shortenAddress } from 'utils'

type AddressTagProps = {
  address: string
}

function AddressTag({ address }: AddressTagProps) {
  return (
    <Tooltip placement="topLeft" title={address}>
      <Button type="text" size="small">
        {shortenAddress(address)}
      </Button>
    </Tooltip>
  )
}

export default AddressTag
