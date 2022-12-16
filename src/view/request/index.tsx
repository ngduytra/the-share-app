import { Row, Col, Typography, Segmented } from 'antd'
import { useMemo, useState } from 'react'
import RequestAdmin from './admin'
import RequestUser from './user'

export const REQUEST_TABS = [
  { label: 'Wait For Accept', value: 'wait-for-accept' },
  { label: 'Sent', value: 'sent' },
]

function Request() {
  const [tab, setTab] = useState<string | number>(REQUEST_TABS[0].value)

  const content = useMemo(() => {
    if (tab === REQUEST_TABS[0].value) return <RequestAdmin />
    return <RequestUser />
  }, [tab])
  return (
    <Row gutter={[16, 16]} justify="center">
      <Col>
        <Typography.Title level={2}>Request</Typography.Title>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]} justify="center">
          <Col>
            <Segmented
              className="navigation"
              options={REQUEST_TABS}
              value={tab}
              onChange={(val) => setTab(val)}
              block
            />
          </Col>
          <Col span={24}>{content}</Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Request
