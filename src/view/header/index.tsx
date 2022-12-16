import { Col, Row, Image, Space, Typography } from 'antd'

import Logo from '../../static/images/theshare.png'

const Header = () => {
  return (
    <Row
      gutter={[24, 24]}
      style={{ padding: '28px 150px', background: '#FCFCFD' }}
    >
      <Col flex={1}>
        <Image src={Logo} preview={false} width={203} />
      </Col>
      <Col style={{ alignItems: 'center', display: 'flex' }}>
        <Space
          style={{
            padding: 6,
            borderRadius: 12,
            width: '100%',
          }}
          wrap={false}
        >
          <Typography.Text>
            Powered by <strong>Solana</strong>
          </Typography.Text>
        </Space>
      </Col>
    </Row>
  )
}

export default Header
