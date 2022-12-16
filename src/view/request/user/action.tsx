import { BN } from '@project-serum/anchor'
import IonIcon from '@sentre/antd-ionicon'
import {
  Row,
  Col,
  Button,
  Modal,
  Typography,
  InputNumber,
  Input,
  Space,
  Popover,
} from 'antd'
import { useRequest } from 'hooks/useRequest'
import { theShareProgram } from 'lib'
import React, { useCallback, useState } from 'react'

type ActionProps = {
  requestAddress: string
}

type ModalContentProps = {
  onEditRequest: (amount: number, reason: string) => void
  requestAddress: string
  loading: boolean
}

function Action({ requestAddress }: ActionProps) {
  const [openAccept, setOpenAccept] = useState(false)
  const [openReject, setOpenReject] = useState(false)
  const [loadingAccept, setLoadingAccept] = useState(false)
  const [loadingReject, setLoadingReject] = useState(false)

  const onEditRequest = useCallback(
    async (amount: number, reason: string) => {
      setLoadingAccept(true)
      try {
        await theShareProgram.changeRequest({
          amount: new BN(amount),
          reason,
          requestAddress,
        })
        window.notify({ type: 'success', description: 'Accept successfully' })
      } catch (err) {
        window.notify({ type: 'error', description: 'Accept failed' })
      } finally {
        setLoadingAccept(false)
      }
    },
    [requestAddress],
  )

  const onCancelRequest = useCallback(async () => {
    setOpenReject(false)
    setLoadingReject(true)
    try {
      await theShareProgram.cancelRequest({ requestAddress })
      window.notify({ type: 'success', description: 'Reject successfully' })
    } catch (err) {
      window.notify({ type: 'error', description: 'Reject failed' })
    } finally {
      setLoadingReject(false)
    }
  }, [requestAddress])

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Space size={8}>
          <Button type="primary" onClick={() => setOpenAccept(true)}>
            Edit
          </Button>

          <Popover
            content={
              <Row>
                <Col span={24}>
                  <Typography.Text>
                    Do you want to reject this request?{' '}
                  </Typography.Text>
                </Col>
                <Col span={24}>
                  <Space
                    direction="vertical"
                    align="end"
                    style={{ width: '100%' }}
                  >
                    <Button
                      type="primary"
                      onClick={onCancelRequest}
                      loading={loadingReject}
                    >
                      Confirm
                    </Button>
                  </Space>
                </Col>
              </Row>
            }
            title="Reject Request"
            trigger="click"
            open={openReject}
            onOpenChange={(val) => setOpenReject(val)}
          >
            <Button danger loading={loadingReject}>
              Cancel
            </Button>
          </Popover>
        </Space>
        <Modal
          open={openAccept}
          onCancel={() => setOpenAccept(false)}
          destroyOnClose
          footer={null}
        >
          <ModalContent
            requestAddress={requestAddress}
            onEditRequest={onEditRequest}
            loading={loadingAccept}
          />
        </Modal>
      </Col>
    </Row>
  )
}

const ModalContent = ({
  onEditRequest,
  requestAddress,
  loading,
}: ModalContentProps) => {
  const {
    [requestAddress]: { amount: currentAmount, reason: currentReason },
  } = useRequest()
  const [amount, setAmount] = useState(currentAmount.toNumber())
  const [reason, setReason] = useState(currentReason)

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
          <Button
            onClick={() => onEditRequest(amount, reason)}
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
