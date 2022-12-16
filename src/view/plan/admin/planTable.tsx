import React from 'react'
import { Row, Table, Typography, Col } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { PlanData } from 'lib'
import AddressTag from 'components/addressTag'
import {} from '@sentre/senhub'
import { shortenAddress } from 'utils'
import Action from './action'

const columns: ColumnsType<PlanData & { planAddress: string }> = [
  {
    title: 'Plan Name',
    dataIndex: 'planName',
    key: 'planName',
    render: (planName) => <Typography.Text>{planName}</Typography.Text>,
  },
  {
    title: 'Withdrawer List',
    dataIndex: 'withdrawerList',
    key: 'withdrawerList',
    render: (withdrawerList) => (
      <Row wrap={true}>
        {withdrawerList.map((wt: any) => (
          <Col span={24}>
            <AddressTag address={wt.toBase58()} />
          </Col>
        ))}
      </Row>
    ),
  },
  {
    title: 'Current fund',
    dataIndex: 'fund',
    key: 'fund',
    render: (fund) => <Typography.Text>{fund.toNumber()}</Typography.Text>,
  },
  {
    title: 'Token',
    key: 'token',
    dataIndex: 'token',
    render: (token) => (
      <Typography.Text>{shortenAddress(token.toBase58())}</Typography.Text>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => <Action planAddress={record.planAddress} />,
  },
]

function PlanTable({ data }: { data: (PlanData & { planAddress: string })[] }) {
  return (
    <Table
      columns={columns}
      dataSource={data}
      className="table-custom"
      bordered={false}
    />
  )
}

export default PlanTable
