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
import { notifyError, notifySuccess } from 'helper'
import { theShareProgram } from 'lib'
import React, { useCallback, useState } from 'react'

type ActionProps = {
  planAddress: string
}

type ModalContentProps = {
  onCreateRequest: (amount: number, reason: string) => void
  loading: boolean
}

function Action({ planAddress }: ActionProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const onCreateRequest = useCallback(
    async (amount: number, reason: string) => {
      setLoading(true)
      try {
        const { txId } = await theShareProgram.createRequest({
          amount: new BN(amount),
          reason,
          planAddress,
        })
        notifySuccess('Create Request', txId)
      } catch (err) {
        notifyError(err)
      } finally {
        setLoading(false)
        setOpen(false)
      }
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
        <ModalContent onCreateRequest={onCreateRequest} loading={loading} />
      </Modal>
    </Row>
  )
}

const ModalContent = ({ onCreateRequest, loading }: ModalContentProps) => {
  const [amount, setAmount] = useState(0)
  const [reason, setReason] = useState('')

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Title level={3}>Create Request</Typography.Title>
      </Col>
      <Col span={24}>
        <Typography.Title level={5}>Amount</Typography.Title>

        <InputNumber
          style={{ width: '100%' }}
          value={amount}
          onChange={(value) => setAmount(value)}
        />
      </Col>
      <Col span={24}>
        <Typography.Title level={5}>Reason</Typography.Title>

        <Input.TextArea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </Col>

      <Col span={24}>
        <Space style={{ width: '100%' }} direction="vertical" align="end">
          <Button
            onClick={() => onCreateRequest(amount, reason)}
            loading={loading}
          >
            Submit
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default Action
