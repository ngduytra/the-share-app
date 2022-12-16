import { Col, Row } from 'antd'
import { useSentRequest } from 'hooks/useSentRequest'

import PlanTable from './requestTable'

function RequestUser() {
  const requests = useSentRequest()

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <PlanTable data={requests} />
      </Col>
    </Row>
  )
}

export default RequestUser
