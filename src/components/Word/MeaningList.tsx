import { Typography } from '@douyinfe/semi-ui'
import type { Meaning } from '../../services/wordApi'

const { Text, Paragraph } = Typography

type Props = {
  meanings: Meaning[]
}

export function MeaningList({ meanings }: Props) {
  return (
    <ol style={{ paddingLeft: 20, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {meanings.map((m, i) => (
        <li key={i}>
          <Paragraph style={{ marginBottom: m.examples?.length ? 8 : 0, lineHeight: 1.6 }}>
            {m.definition}
          </Paragraph>
          {m.examples && m.examples.length > 0 && (
            <ul style={{ paddingLeft: 16, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {m.examples.map((ex, j) => (
                <li key={j}>
                  <Text type="tertiary" style={{ fontStyle: 'italic', fontSize: 13, lineHeight: 1.5 }}>
                    {ex}
                  </Text>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  )
}
