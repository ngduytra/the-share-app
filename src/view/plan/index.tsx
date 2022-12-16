import { Row, Col, Typography, Segmented, Space } from 'antd'
import { useMemo, useState } from 'react'
import PlanAdmin from './admin'
import CreatePlan from './admin/createPlan'
import PlanGeneral from './general'

export const PLAN_TABS = [
  { label: 'All Plan', value: 'all-plan' },
  { label: 'Your Plan', value: 'your-plan' },
]

function Plan() {
  const [tab, setTab] = useState<string | number>(PLAN_TABS[0].value)

  const content = useMemo(() => {
    if (tab === PLAN_TABS[0].value) return <PlanGeneral />
    return <PlanAdmin />
  }, [tab])

  return (
    <Row gutter={[16, 16]} justify="center">
      <Col>
        <Typography.Title level={2}>Plan</Typography.Title>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]} justify="center">
          <Col>
            <Segmented
              options={PLAN_TABS}
              value={tab}
              onChange={(val) => setTab(val)}
              block
            />
          </Col>
          <Col span={24}>
            <Space style={{ width: '100%' }} direction="vertical" align="end">
              <CreatePlan />
            </Space>
          </Col>
          <Col span={24}>{content}</Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Plan
