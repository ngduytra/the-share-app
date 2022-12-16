import React from 'react'
import { Row, Col, Table, Typography, Space } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { PlanData } from 'lib'
import AddressTag from 'components/addressTag'
import {} from '@sentre/senhub'
import Action from './action'
import { MintAvatar, MintSymbol } from '@sen-use/app'

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
      <Space size={4}>
        <MintAvatar mintAddress={token.toBase58()} />
        <MintSymbol mintAddress={token.toBase58()} />
      </Space>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => <Action planAddress={record.planAddress} />,
  },
]

function PlanTable({ data }: { data: (PlanData & { planAddress: string })[] }) {
  return <Table columns={columns} dataSource={data} className="table-custom" />
}

export default PlanTable
