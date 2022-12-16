import { Col, Row } from 'antd'
import { useYourPlan } from 'hooks/useYourPlan'

import PlanTable from './planTable'

function PlanAdmin() {
  const plans = useYourPlan()

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <PlanTable data={plans} />
      </Col>
    </Row>
  )
}

export default PlanAdmin
