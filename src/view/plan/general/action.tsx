import { BN } from '@project-serum/anchor'
import {
  Row,
  Col,
  Button,
  Modal,
  Typography,
  InputNumber,
  Input,
  Space,
} from 'antd'
import { theShareProgram } from 'lib'
import React, { useCallback, useState } from 'react'

type ActionProps = {
  planAddress: string
}

type ModalContentProps = {
  onCreateRequest: (amount: number, reason: string) => void
}

function Action({ planAddress }: ActionProps) {
  const [open, setOpen] = useState(false)

  const onCreateRequest = useCallback(
    (amount: number, reason: string) => {
      theShareProgram.createRequest({
        amount: new BN(amount),
        reason,
        planAddress,
      })
    },
    [planAddress],
  )

  return (
    <Row>
      <Col>
        <Button type="primary" onClick={() => setOpen(true)}>
          Request
        </Button>
      </Col>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        destroyOnClose
        footer={null}
      >
        <ModalContent onCreateRequest={onCreateRequest} />
      </Modal>
    </Row>
  )
}

const ModalContent = ({ onCreateRequest }: ModalContentProps) => {
  const [amount, setAmount] = useState(0)
  const [reason, setReason] = useState('')

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Title level={3}>Create Request</Typography.Title>
      </Col>
      <Col span={24}>
        <Typography.Title level={5}>Amount</Typography.Title>
        <Space style={{ width: '100%' }}>
          <InputNumber value={amount} onChange={(value) => setAmount(value)} />
        </Space>
      </Col>
      <Col span={24}>
        <Typography.Title level={5}>Reason</Typography.Title>
        <Space style={{ width: '100%' }}>
          <Input.TextArea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Space>
      </Col>

      <Col span={24}>
        <Space style={{ width: '100%' }} direction="vertical" align="end">
          <Button onClick={() => onCreateRequest(amount, reason)}>
            Submit
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default Action
