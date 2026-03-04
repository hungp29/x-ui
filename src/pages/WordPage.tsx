import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, Input, Spin, Tooltip, Typography, Empty, Tabs, TabPane } from '@douyinfe/semi-ui'
import { IconSearch, IconBookStroked, IconCopy, IconCode, IconImport, IconTickCircle } from '@douyinfe/semi-icons'
import { WordCard } from '../components/Word'
import { useWordLookup, type WordLookupState } from '../hooks/useWordLookup'
import { useDebounce } from '../hooks/useDebounce'
import { wordToHtml } from '../utils/wordToHtml'
import type { Dict } from '../services/wordApi'
import styles from './WordPage.module.css'

const { Title, Paragraph, Text } = Typography

const DEBOUNCE_MS = 500
type TabKey = 'en' | 'en-vi'
type CopiedKey = 'word' | 'content' | null

const TAB_TO_DICT: Record<TabKey, Dict> = {
  'en': 'english',
  'en-vi': 'english-vietnamese',
}

type WordResultProps = {
  state: WordLookupState
  dict: Dict
  cardRef: React.Ref<HTMLDivElement>
}

function WordResult({ state, dict, cardRef }: WordResultProps) {
  const { t } = useTranslation()

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
  const [copied, setCopied] = useState<CopiedKey>(null)
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const queryParam = searchParams.get('q') ?? ''
  const [inputValue, setInputValue] = useState(queryParam)
  const debouncedWord = useDebounce(inputValue.trim(), DEBOUNCE_MS)

  useEffect(() => {
    // Scroll the main content container back to top whenever the tab changes
    document.querySelector('.main-content')?.scrollTo({ top: 0, behavior: 'instant' })
  }, [activeTab])

  const dict = TAB_TO_DICT[activeTab]
  const enState = useWordLookup(debouncedWord, 'english')
  const enViState = useWordLookup(debouncedWord, 'english-vietnamese')
  const lookupState = activeTab === 'en' ? enState : enViState

  useEffect(() => {
    setSearchParams(debouncedWord ? { q: debouncedWord } : {}, { replace: true })
  }, [debouncedWord, setSearchParams])

  useEffect(() => {
    setInputValue(queryParam)
  }, [queryParam])

  // Clear any pending timer on unmount
  useEffect(() => () => { if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current) }, [])

  const flashCopied = (key: CopiedKey) => {
    if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current)
    setCopied(key)
    copiedTimerRef.current = setTimeout(() => setCopied(null), 2000)
  }

  const handleInput = (value: string) => setInputValue(value.toLowerCase())

  const handleCopyWord = async () => {
    await navigator.clipboard.writeText(debouncedWord)
    flashCopied('word')
  }

  const handleCopyContent = async () => {
    if (enState.status !== 'success') return
    const enViEntry = enViState.status === 'success' ? enViState.data : null
    const html = wordToHtml(enState.data, enViEntry)
    await navigator.clipboard.writeText(html)
    flashCopied('content')
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
                <span>
                  <Button
                    size="small"
                    theme="borderless"
                    icon={copied === 'word'
                      ? <IconTickCircle style={{ color: 'var(--semi-color-success)' }} />
                      : <IconCopy />}
                    onClick={handleCopyWord}
                    aria-label={t('word.actions.copyWord')}
                  />
                </span>
              </Tooltip>
              <Tooltip content={t('word.actions.copyContent')}>
                <span>
                  <Button
                    size="small"
                    theme="borderless"
                    icon={copied === 'content'
                      ? <IconTickCircle style={{ color: 'var(--semi-color-success)' }} />
                      : <IconCode />}
                    onClick={handleCopyContent}
                    disabled={enState.status !== 'success'}
                    aria-label={t('word.actions.copyContent')}
                  />
                </span>
              </Tooltip>
              <Tooltip content={t('word.actions.ankiComingSoon')} position="topRight">
                <span>
                  <Button
                    size="small"
                    theme="borderless"
                    icon={<IconImport />}
                    disabled
                    aria-label={t('word.actions.importAnki')}
                  />
                </span>
              </Tooltip>
            </div>
          </div>
        )}
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <div className={styles.content}>
        {debouncedWord ? (
          <WordResult state={lookupState} dict={dict} cardRef={cardRef} />
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
