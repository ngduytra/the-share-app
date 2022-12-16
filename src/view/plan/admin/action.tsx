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
} from 'antd'
import { theShareProgram } from 'lib'
import React, { useCallback, useState } from 'react'

type ActionProps = {
  planAddress: string
}

type ModalContentProps = {
  onEditPlan: (
    amount: number,
    planName: string,
    withdrawerList: string[],
  ) => void
}

function Action({ planAddress }: ActionProps) {
  const [open, setOpen] = useState(false)

  const onEditPlan = useCallback(
    (amount: number, planName: string, withdrawerList: string[]) => {
      theShareProgram.changePlanConfigs({
        fund: new BN(amount),
        planName,
        withdrawerList,
        planAddress,
      })
    },
    [planAddress],
  )

  return (
    <Row>
      <Col>
        <Button type="primary" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </Col>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        destroyOnClose
        footer={null}
      >
        <ModalContent onEditPlan={onEditPlan} />
      </Modal>
    </Row>
  )
}

const ModalContent = ({ onEditPlan }: ModalContentProps) => {
  const [amount, setAmount] = useState(0)
  const [reason, setReason] = useState('')
  const [withdrawerList, setWithdrawerList] = useState<string[]>([])

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Title level={3}>Edit Your Plan</Typography.Title>
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
        <Row gutter={[6, 6]}>
          <Col span={24}>
            <Typography.Title level={5}>Withdrawer List</Typography.Title>
          </Col>
          <Col span={24}>
            <Row gutter={[12, 12]}>
              {withdrawerList.map((attribute, idx) => (
                <Col span={24}>
                  <Row gutter={[12, 12]}>
                    <Col span={24}>
                      <Row>
                        <Col>
                          <Typography.Text type="secondary">
                            #{idx}
                          </Typography.Text>
                        </Col>
                        <Col flex="auto">
                          <Space
                            style={{ width: '100%' }}
                            direction="vertical"
                            align="end"
                          >
                            <Button
                              size="small"
                              onClick={() => {
                                const newAttributes = [
                                  ...withdrawerList,
                                ].filter((_, index) => index !== idx)
                                setWithdrawerList(newAttributes)
                              }}
                            >
                              <IonIcon name="trash-outline" />
                            </Button>
                          </Space>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={12}>
                      <Input
                        placeholder="type"
                        value={attribute}
                        onChange={(e) => {
                          const newList = [...withdrawerList]
                          newList[idx] = e.target.value
                          setWithdrawerList(newList)
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          </Col>
          <Col span={24}>
            <Button
              block
              type="dashed"
              onClick={() => {
                setWithdrawerList([...withdrawerList, ''])
              }}
            >
              <IonIcon name="add-outline" />
              Add more
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Space style={{ width: '100%' }} direction="vertical" align="end">
          <Button onClick={() => onEditPlan(amount, reason, withdrawerList)}>
            Submit
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default Action
