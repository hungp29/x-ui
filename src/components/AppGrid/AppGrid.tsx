import { Typography } from '@douyinfe/semi-ui'
import { AppCard } from './AppCard'
import type { AppItem } from './types'
import styles from './AppGrid.module.css'

const { Title } = Typography

type Props = {
  apps: AppItem[]
  /** Optional section heading rendered above the grid */
  title?: string
}

export function AppGrid({ apps, title }: Props) {
  return (
    <section>
      {title && (
        <Title heading={6} style={{ marginBottom: 12 }}>
          {title}
        </Title>
      )}
      <div className={styles.grid}>
        {apps.map((app) => (
          <AppCard
            key={app.key}
            name={app.name}
            icon={app.icon}
            description={app.description}
            href={app.href}
            onClick={app.onClick}
            disabled={app.disabled}
          />
        ))}
      </div>
    </section>
  )
}
