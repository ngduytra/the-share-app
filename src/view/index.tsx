import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAppRoute, useWalletAddress } from '@sentre/senhub'

import { Row, Col, Typography, Button, Space } from 'antd'

import { AppDispatch, AppState } from 'model'

import Plan from './plan'
import Request from './request'
import { fetchPlans } from 'model/plan.controller'
import Header from './header'

import './index.less'
import { fetchRequests } from 'model/request.controller'
import { AppWatcher } from 'components/watcher'

const View = () => {
  // const walletAddress = useWalletAddress()
  // const dispatch = useDispatch<AppDispatch>()

  // useEffect(() => {
  //   dispatch(fetchPlans())
  // }, [dispatch])

  // useEffect(() => {
  //   dispatch(fetchRequests())
  // }, [dispatch])

  return (
    <AppWatcher>
      <Row align="middle" style={{ margin: -12 }}>
        <Col span={24}>
          <Header />
        </Col>
        <Col span={24}>
          <Row
            gutter={[32, 32]}
            style={{
              padding: '28px 150px',
              background: '#fafafa',
            }}
          >
            <Col span={24} style={{ borderBottom: '2px dashed #B1B5C4' }}>
              <Plan />
            </Col>
            <Col span={24}>
              <Request />
            </Col>
          </Row>
        </Col>
      </Row>
    </AppWatcher>
  )
}

export default View
