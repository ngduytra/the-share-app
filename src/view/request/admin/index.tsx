import { Col, Row } from 'antd'
import { useWaitRequest } from 'hooks/useWaitRequest'

import RequestTable from './requestTable'

function RequestAdmin() {
  const requests = useWaitRequest()

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <RequestTable data={requests} />
      </Col>
    </Row>
  )
}

export default RequestAdmin
