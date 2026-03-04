import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, Input, Spin, Toast, Tooltip, Typography, Empty, Tabs, TabPane } from '@douyinfe/semi-ui'
import { IconSearch, IconBookStroked, IconCopy, IconCode, IconImport } from '@douyinfe/semi-icons'
import { WordCard } from '../components/Word'
import { useWordLookup } from '../hooks/useWordLookup'
import { useDebounce } from '../hooks/useDebounce'
import styles from './WordPage.module.css'

const { Title, Paragraph, Text } = Typography

const DEBOUNCE_MS = 500
type TabKey = 'en' | 'en-vi'

async function copyHtml(html: string) {
  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()], { type: 'text/plain' }),
      }),
    ])
  } catch {
    // Fallback for browsers without ClipboardItem support
    await navigator.clipboard.writeText(html)
  }
}

type WordResultProps = {
  word: string
  dict: 'english' | 'english-vietnamese'
  cardRef: React.Ref<HTMLDivElement>
}

function WordResult({ word, dict, cardRef }: WordResultProps) {
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
    return <WordCard ref={cardRef} entry={state.data} dict={dict} />
  }

  return null
}

export default function WordPage() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabKey>('en')
  const cardRef = useRef<HTMLDivElement>(null)

  const queryParam = searchParams.get('q') ?? ''
  const [inputValue, setInputValue] = useState(queryParam)
  const debouncedWord = useDebounce(inputValue.trim(), DEBOUNCE_MS)

  useEffect(() => {
    setSearchParams(debouncedWord ? { q: debouncedWord } : {}, { replace: true })
  }, [debouncedWord, setSearchParams])

  useEffect(() => {
    setInputValue(queryParam)
  }, [queryParam])

  const handleInput = (value: string) => setInputValue(value.toLowerCase())

  const handleCopyWord = async () => {
    await navigator.clipboard.writeText(debouncedWord)
    Toast.success({ content: t('word.actions.copied'), duration: 2 })
  }

  const handleCopyContent = async () => {
    const html = cardRef.current?.innerHTML
    if (!html) return
    await copyHtml(html)
    Toast.success({ content: t('word.actions.copied'), duration: 2 })
  }

  return (
    <div>
      {/* ── Sticky: title + search + tabs + actions ────────────── */}
      <div className={styles.header}>
        <div style={{ paddingTop: 16, paddingBottom: 16 }}>
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
          onChange={handleInput}
          showClear
          autoFocus
        />

        {debouncedWord && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, borderBottom: '1px solid var(--semi-color-border)' }}>
            <Tabs
              activeKey={activeTab}
              onChange={(k) => setActiveTab(k as TabKey)}
              contentStyle={{ display: 'none' }}
              className={styles.tabs}
            >
              <TabPane tab={t('word.tabEnglish')} itemKey="en" />
              <TabPane tab={t('word.tabEnglishVi')} itemKey="en-vi" />
            </Tabs>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 4, flexShrink: 0, paddingBottom: 4 }}>
              <Tooltip content={t('word.actions.copyWord')}>
                <Button
                  size="small"
                  theme="borderless"
                  icon={<IconCopy />}
                  onClick={handleCopyWord}
                  aria-label={t('word.actions.copyWord')}
                />
              </Tooltip>
              <Tooltip content={t('word.actions.copyContent')}>
                <Button
                  size="small"
                  theme="borderless"
                  icon={<IconCode />}
                  onClick={handleCopyContent}
                  aria-label={t('word.actions.copyContent')}
                />
              </Tooltip>
              <Tooltip content={t('word.actions.ankiComingSoon')} position="topRight">
                <Button
                  size="small"
                  theme="borderless"
                  icon={<IconImport />}
                  disabled
                  aria-label={t('word.actions.importAnki')}
                />
              </Tooltip>
            </div>
          </div>
        )}
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <div className={styles.content}>
        {debouncedWord ? (
          activeTab === 'en'
            ? <WordResult word={debouncedWord} dict="english" cardRef={cardRef} />
            : <WordResult word={debouncedWord} dict="english-vietnamese" cardRef={cardRef} />
        ) : (
          <Empty
            image={<IconBookStroked style={{ fontSize: 64, color: 'var(--semi-color-text-2)' }} />}
            title={t('word.emptyTitle')}
            description={t('word.emptyDescription')}
            style={{ padding: '48px 0' }}
          />
        )}
      </div>
    </div>
  )
}
