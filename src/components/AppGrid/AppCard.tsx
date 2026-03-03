import { Typography } from '@douyinfe/semi-ui'
import type { AppItem } from './types'
import styles from './AppGrid.module.css'

const { Text, Paragraph } = Typography

type Props = Pick<AppItem, 'name' | 'icon' | 'description' | 'href' | 'onClick' | 'disabled'>

export function AppCard({ name, icon, description, href, onClick, disabled = false }: Props) {
  const handleClick = () => {
    if (disabled) return
    if (onClick) {
      onClick()
    } else if (href) {
      window.location.href = href
    }
  }

  return (
    <button
      type="button"
      className={`${styles.card} ${disabled ? styles.disabled : ''}`}
      onClick={handleClick}
      disabled={disabled}
      aria-label={name}
      title={description}
    >
      <span className={styles.icon}>{icon}</span>
      <Text strong className={styles.name} ellipsis={{ showTooltip: true }}>
        {name}
      </Text>
      {description && (
        <Paragraph
          type="tertiary"
          size="small"
          className={styles.description}
          ellipsis={{ rows: 2 }}
        >
          {description}
        </Paragraph>
      )}
    </button>
  )
}
