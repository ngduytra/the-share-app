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
import { notifyError, notifySuccess } from 'helper'
import { usePlan } from 'hooks/usePlan'
import { theShareProgram } from 'lib'
import React, { useCallback, useState } from 'react'

type ActionProps = {
  planAddress: string
  oldAmount: number
  oldReason: string
  oldWithdrawerList: string[]
}

type ModalContentProps = {
  onEditPlan: (
    amount: number,
    planName: string,
    withdrawerList: string[],
  ) => void
  oldAmount: number
  oldReason: string
  oldWithdrawerList: string[]
}

function Action({
  planAddress,
  oldAmount,
  oldReason,
  oldWithdrawerList,
}: ActionProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const onEditPlan = useCallback(
    async (amount: number, planName: string, withdrawerList: string[]) => {
      try {
        const { txId } = await theShareProgram.changePlanConfigs({
          fund: new BN(amount),
          planName,
          withdrawerList,
          planAddress,
        })
        notifySuccess('Edit Plan', txId)
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
          Edit
        </Button>
      </Col>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        destroyOnClose
        footer={null}
      >
        <ModalContent
          onEditPlan={onEditPlan}
          oldAmount={oldAmount}
          oldReason={oldReason}
          oldWithdrawerList={oldWithdrawerList}
        />
      </Modal>
    </Row>
  )
}

const ModalContent = ({
  onEditPlan,
  oldAmount,
  oldReason,
  oldWithdrawerList,
}: ModalContentProps) => {
  const [amount, setAmount] = useState(oldAmount)
  const [reason, setReason] = useState(oldReason)
  const [withdrawerList, setWithdrawerList] = useState<string[]>(
    oldWithdrawerList || [],
  )

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Title level={3}>Edit Your Plan</Typography.Title>
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
        <Typography.Title level={5}>Plan Name</Typography.Title>
        <Input.TextArea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
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
                    <Col span={24}>
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
