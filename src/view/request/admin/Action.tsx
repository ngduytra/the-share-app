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
import { theShareProgram } from 'lib'
import React, { useCallback, useState } from 'react'

type ActionProps = {
  requestAddress: string
}

function Action({ requestAddress }: ActionProps) {
  const [openAccept, setOpenAccept] = useState(false)
  const [openReject, setOpenReject] = useState(false)
  const [loadingAccept, setLoadingAccept] = useState(false)
  const [loadingReject, setLoadingReject] = useState(false)

  const onAcceptRequest = useCallback(async () => {
    setOpenAccept(false)
    setLoadingAccept(true)
    try {
      await theShareProgram.acceptRequest({ requestAddress })
      window.notify({ type: 'success', description: 'Accept successfully' })
    } catch (err) {
      window.notify({ type: 'error', description: 'Accept failed' })
    } finally {
      setLoadingAccept(false)
    }
  }, [requestAddress])

  const onRejectRequest = useCallback(async () => {
    setOpenReject(false)
    setLoadingReject(true)
    try {
      await theShareProgram.rejectRequest({ requestAddress })
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
          <Popover
            content={
              <Row>
                <Col span={24}>
                  <Typography.Text>
                    Do you want to accept this request?{' '}
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
                      onClick={onAcceptRequest}
                      loading={loadingAccept}
                    >
                      Confirm
                    </Button>
                  </Space>
                </Col>
              </Row>
            }
            title="Accept Request"
            trigger="click"
            open={openAccept}
            onOpenChange={(val) => setOpenAccept(val)}
          >
            <Button type="primary" loading={loadingAccept}>
              Accept
            </Button>
          </Popover>
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
                      onClick={onRejectRequest}
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
              Reject
            </Button>
          </Popover>
        </Space>
      </Col>
    </Row>
  )
}

export default Action
