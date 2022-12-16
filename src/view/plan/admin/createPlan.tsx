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
import { MintSelection } from '@sen-use/app'
import { notifyError, notifySuccess } from 'helper'
import { theShareProgram } from 'lib'
import React, { useState } from 'react'
import BalanceToken from 'components/balanceToken'

type ModalContentProps = {
  onCreatePlan: (
    amount: number,
    planName: string,
    withdrawerList: string[],
    token: string,
  ) => void
  loading: boolean
}

function CreatePlan() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const onCreatePlan = async (
    amount: number,
    planName: string,
    withdrawerList: string[],
    tokenAddress: string,
  ) => {
    setLoading(true)
    try {
      const { txId } = await theShareProgram.createPlan({
        fund: new BN(amount),
        planName,
        withdrawerList,
        tokenAddress,
      })
      notifySuccess('Create Plan', txId)
    } catch (err) {
      notifyError(err)
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <Row>
      <Col>
        <Button type="primary" onClick={() => setOpen(true)}>
          Create Plan
        </Button>
      </Col>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        destroyOnClose
        footer={null}
      >
        <ModalContent loading={loading} onCreatePlan={onCreatePlan} />
      </Modal>
    </Row>
  )
}

const ModalContent = ({ onCreatePlan, loading }: ModalContentProps) => {
  const [amount, setAmount] = useState(0)
  const [reason, setReason] = useState('')
  const [withdrawerList, setWithdrawerList] = useState<string[]>([])
  const [token, setToken] = useState('')

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Title level={3}>Create Your Plan</Typography.Title>
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
        <Row>
          <Col flex={1}>
            <Typography.Title level={5}>Token</Typography.Title>
          </Col>
          <Col>
            {' '}
            <BalanceToken mint={token} />
          </Col>
        </Row>

        <MintSelection
          style={{
            background: '#e6eaf5',
            width: '100%',
            textAlign: 'left',
            height: 40,
            paddingLeft: 12,
          }}
          value={token}
          placeholder="Select a token"
          onChange={(val) => setToken(val)}
        />
        {/* <Input value={token} onChange={(e) => setToken(e.target.value)} /> */}
      </Col>
      <Col span={24}>
        <Space style={{ width: '100%' }} direction="vertical" align="end">
          <Button
            className={
              !amount || !reason || withdrawerList.length === 0 || !token
                ? 'has-disable'
                : ''
            }
            onClick={() => onCreatePlan(amount, reason, withdrawerList, token)}
            loading={loading}
            disabled={
              !amount || !reason || withdrawerList.length === 0 || !token
            }
            type="primary"
          >
            Submit
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default CreatePlan
