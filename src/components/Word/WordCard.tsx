import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Tag, Divider, Typography } from '@douyinfe/semi-ui'
import { PhoneticRow } from './PhoneticRow'
import { MeaningList } from './MeaningList'
import type { WordEntry, Dict } from '../../services/wordApi'

const { Title, Text } = Typography

type Props = {
  entry: WordEntry
  dict: Dict
}

export const WordCard = forwardRef<HTMLDivElement, Props>(function WordCard({ entry, dict }, ref) {
  const { t } = useTranslation()
  const isEnglishVi = dict === 'english-vietnamese'

  const phoneticEntries = isEnglishVi
    ? [{ label: t('word.phonetic'), phonetic: entry.phonetic, audioUrl: '' }]
    : [
        { label: 'UK', phonetic: entry.phonetic_uk, audioUrl: entry.audio_uk },
        { label: 'US', phonetic: entry.phonetic_us, audioUrl: entry.audio_us },
      ]

  return (
    <div ref={ref}>
      <Card>
        {/* Word title + part of speech */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
          <Title heading={2} style={{ margin: 0 }}>
            {entry.text}
          </Title>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {entry.part_of_speech.map((pos) => (
              <Tag key={pos} size="small" color="violet" shape="circle">
                {pos}
              </Tag>
            ))}
          </div>
        </div>

        {/* Phonetics */}
        <PhoneticRow entries={phoneticEntries} />

        <Divider style={{ margin: '16px 0' }} />

        {/* Dictionary label */}
        <Text
          strong
          style={{
            display: 'block',
            marginBottom: 12,
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--semi-color-text-2)',
          }}
        >
          {isEnglishVi ? t('word.viTranslation') : t('word.enDefinitions')}
        </Text>

        <MeaningList meanings={entry.meanings} />
      </Card>
    </div>
  )
})
