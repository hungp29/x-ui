import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Input, Spin, Typography, Empty, Tabs, TabPane } from '@douyinfe/semi-ui'
import { IconSearch, IconBookStroked } from '@douyinfe/semi-icons'
import { WordCard } from '../components/Word'
import { useWordLookup } from '../hooks/useWordLookup'
import { useDebounce } from '../hooks/useDebounce'

const { Title, Paragraph, Text } = Typography

const DEBOUNCE_MS = 500

function WordResult({ word, dict }: { word: string; dict: 'english' | 'english-vietnamese' }) {
  const { t } = useTranslation()
  const state = useWordLookup(word, dict)

  if (state.status === 'loading') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (state.status === 'not-found') {
    return (
      <Empty
        image={<IconBookStroked style={{ fontSize: 64, color: 'var(--semi-color-text-2)' }} />}
        title={t('word.notFound')}
        description={t('word.noResults', { word: state.word })}
        style={{ padding: '48px 0' }}
      />
    )
  }

  if (state.status === 'error') {
    return (
      <div style={{ padding: '24px 0' }}>
        <Text type="danger">{state.message}</Text>
      </div>
    )
  }

  if (state.status === 'success') {
    return <WordCard entry={state.data} dict={dict} />
  }

  return null
}

export default function WordPage() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  const queryParam = searchParams.get('q') ?? ''
  const [inputValue, setInputValue] = useState(queryParam)
  const debouncedWord = useDebounce(inputValue.trim(), DEBOUNCE_MS)

  // Keep URL in sync with debounced value
  useEffect(() => {
    setSearchParams(debouncedWord ? { q: debouncedWord } : {}, { replace: true })
  }, [debouncedWord, setSearchParams])

  // Sync input when URL changes externally (e.g. browser back/forward)
  useEffect(() => {
    setInputValue(queryParam)
  }, [queryParam])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 720 }}>
      <div>
        <Title heading={3} style={{ marginBottom: 4 }}>
          {t('apps.word.name')}
        </Title>
        <Paragraph type="tertiary">{t('word.subtitle')}</Paragraph>
      </div>

      <Input
        size="large"
        prefix={<IconSearch />}
        placeholder={t('word.searchPlaceholder')}
        value={inputValue}
        onChange={setInputValue}
        showClear
        autoFocus
      />

      {debouncedWord ? (
        <Tabs type="line" keepDOM={false}>
          <TabPane tab={t('word.tabEnglish')} itemKey="en">
            <div style={{ paddingTop: 16 }}>
              <WordResult word={debouncedWord} dict="english" />
            </div>
          </TabPane>
          <TabPane tab={t('word.tabEnglishVi')} itemKey="en-vi">
            <div style={{ paddingTop: 16 }}>
              <WordResult word={debouncedWord} dict="english-vietnamese" />
            </div>
          </TabPane>
        </Tabs>
      ) : (
        <Empty
          image={<IconBookStroked style={{ fontSize: 64, color: 'var(--semi-color-text-2)' }} />}
          title={t('word.emptyTitle')}
          description={t('word.emptyDescription')}
          style={{ padding: '48px 0' }}
        />
      )}
    </div>
  )
}
