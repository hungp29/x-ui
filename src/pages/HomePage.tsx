import { useNavigate } from 'react-router-dom'
import { Typography, Button } from '@douyinfe/semi-ui'
import { IconApps } from '@douyinfe/semi-icons'
import { AppGrid } from '../components/AppGrid'
import { useIsMobile } from '../hooks/useIsMobile'
import { ALL_APPS } from '../data/apps'

const { Title, Paragraph } = Typography

const DESKTOP_LIMIT = 8
const MOBILE_LIMIT = 4

export default function HomePage() {
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  const limit = isMobile ? MOBILE_LIMIT : DESKTOP_LIMIT
  const featuredApps = ALL_APPS.slice(0, limit)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <Title heading={3} style={{ marginBottom: 4 }}>
          Home
        </Title>
        <Paragraph type="tertiary">Welcome back</Paragraph>
      </div>

      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <Title heading={6} style={{ margin: 0 }}>
            Apps
          </Title>
          <Button
            theme="borderless"
            size="small"
            icon={<IconApps />}
            onClick={() => navigate('/apps')}
          >
            See all
          </Button>
        </div>
        <AppGrid apps={featuredApps} />
      </section>
    </div>
  )
}
