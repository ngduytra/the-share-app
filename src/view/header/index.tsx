import { Col, Row, Image, Space } from 'antd'

import Logo from '../../static/images/theshare.png'
import Solana from '../../static/images/solana.svg'

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
            background: '#944095',
            padding: 6,
            borderRadius: 12,
            width: '100%',
          }}
        >
          <Image src={Solana} preview={false} width={203} />
        </Space>
      </Col>
    </Row>
  )
}

export default Header
