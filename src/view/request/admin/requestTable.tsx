import React from 'react'
import { Table, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { RequestData } from 'lib'
import Action from './Action'
import moment from 'moment'
import AddressTag from 'components/addressTag'

const columns: ColumnsType<RequestData & { requestAddress: string }> = [
  {
    title: 'Plan',
    dataIndex: 'plan',
    key: 'plan',
    render: (plan) => (
      <Typography.Text>
        <AddressTag address={plan.toBase58()} />
      </Typography.Text>
    ),
  },
  {
    title: 'Withdrawer',
    dataIndex: 'withdrawer',
    key: 'withdrawer',
    render: (withdrawer) => (
      <Typography.Text>
        <AddressTag address={withdrawer.toBase58()} />
      </Typography.Text>
    ),
  },
  {
    title: 'Current fund',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount) => <Typography.Text>{amount.toNumber()}</Typography.Text>,
  },
  {
    title: 'Reason',
    key: 'reason',
    dataIndex: 'reason',
    render: (reason) => <Typography.Text>{reason}</Typography.Text>,
  },
  {
    title: 'Time',
    key: 'time',
    dataIndex: 'time',
    render: (time) => (
      <Typography.Text>
        {moment(time).format('MM-D-YYYY, h:mm a')}
      </Typography.Text>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => <Action requestAddress={record.requestAddress} />,
  },
]

function RequestTable({
  data,
}: {
  data: (RequestData & { requestAddress: string })[]
}) {
  return <Table columns={columns} dataSource={data} className="table-custom" />
}

export default RequestTable
