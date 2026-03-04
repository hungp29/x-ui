import { Typography } from '@douyinfe/semi-ui'
import { AppGrid } from '../components/AppGrid'
import { ALL_APPS } from '../data/apps'

const { Title, Paragraph } = Typography

export default function AllAppsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <Title heading={3} style={{ marginBottom: 4 }}>
          All Apps
        </Title>
        <Paragraph type="tertiary">{ALL_APPS.length} applications available</Paragraph>
      </div>

      <AppGrid apps={ALL_APPS} />
    </div>
  )
}
