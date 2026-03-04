import { useTranslation } from 'react-i18next'
import { Typography, Card, RadioGroup, Radio } from '@douyinfe/semi-ui'
import { useTheme } from '../context/ThemeContext'
import { setLanguage, SUPPORTED_LANGUAGES } from '../i18n'
import type { ThemePreference } from '../context/ThemeContext'
import type { LangCode } from '../i18n'

const { Title, Paragraph } = Typography

export default function SettingsPage() {
  const { t, i18n } = useTranslation()
  const { preference, setPreference } = useTheme()

  return (
    <div className="page-padding" style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 560 }}>
      <div>
        <Title heading={3} style={{ marginBottom: 4 }}>
          {t('settings.title')}
        </Title>
        <Paragraph type="tertiary">{t('settings.subtitle')}</Paragraph>
      </div>

      {/* Language */}
      <Card
        title={t('settings.language.label')}
        headerExtraContent={
          <Paragraph type="tertiary" size="small">
            {t('settings.language.description')}
          </Paragraph>
        }
      >
        <RadioGroup
          value={i18n.language}
          onChange={(e) => setLanguage(e.target.value as LangCode)}
          direction="vertical"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <Radio key={lang.code} value={lang.code}>
              {lang.label}
            </Radio>
          ))}
        </RadioGroup>
      </Card>

      {/* Theme */}
      <Card
        title={t('settings.theme.label')}
        headerExtraContent={
          <Paragraph type="tertiary" size="small">
            {t('settings.theme.description')}
          </Paragraph>
        }
      >
        <RadioGroup
          value={preference}
          onChange={(e) => setPreference(e.target.value as ThemePreference)}
          direction="vertical"
        >
          <Radio value="system">{t('settings.theme.system')}</Radio>
          <Radio value="light">{t('settings.theme.light')}</Radio>
          <Radio value="dark">{t('settings.theme.dark')}</Radio>
        </RadioGroup>
      </Card>
    </div>
  )
}
