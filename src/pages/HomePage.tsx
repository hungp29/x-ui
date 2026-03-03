import { Card, Typography, Row, Col } from '@douyinfe/semi-ui'
import { IconActivity, IconUser, IconServer, IconCheckCircleStroked } from '@douyinfe/semi-icons'

const { Title, Paragraph, Text } = Typography

const stats = [
  { title: 'Users', value: '1,024', icon: <IconUser size="extra-large" />, color: 'var(--semi-color-primary)' },
  { title: 'Services', value: '32', icon: <IconServer size="extra-large" />, color: 'var(--semi-color-success)' },
  { title: 'Activity', value: '256', icon: <IconActivity size="extra-large" />, color: 'var(--semi-color-warning)' },
  { title: 'Resolved', value: '98%', icon: <IconCheckCircleStroked size="extra-large" />, color: 'var(--semi-color-tertiary)' },
]

export default function HomePage() {
  return (
    <div>
      <Title heading={3} style={{ marginBottom: 8 }}>
        Welcome to x-ui
      </Title>
      <Paragraph type="tertiary" style={{ marginBottom: 24 }}>
        Your dashboard overview
      </Paragraph>

      <Row gutter={[16, 16]}>
        {stats.map((stat) => (
          <Col key={stat.title} xs={24} sm={12} lg={6}>
            <Card bodyStyle={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ color: stat.color }}>{stat.icon}</span>
              <div>
                <Paragraph type="tertiary" style={{ marginBottom: 2, fontSize: 12 }}>
                  {stat.title}
                </Paragraph>
                <Text strong style={{ fontSize: 24 }}>
                  {stat.value}
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Card style={{ marginTop: 24 }} title="Getting Started">
        <Paragraph>
          This project is built with <strong>Vite</strong>, <strong>React</strong>,{' '}
          <strong>TypeScript</strong>, and <strong>Semi Design</strong>. Edit{' '}
          <code>src/pages/HomePage.tsx</code> to get started.
        </Paragraph>
      </Card>
    </div>
  )
}
