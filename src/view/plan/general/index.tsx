import { Col, Row } from 'antd'

import { usePlanCanJoin } from 'hooks/usePlanCanJoin'
import PlanTable from './planTable'

function PlanGeneral() {
  const plans = usePlanCanJoin()

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <PlanTable data={plans} />
      </Col>
    </Row>
  )
}

export default PlanGeneral
