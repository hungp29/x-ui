import { useRef } from 'react'
import { Button, Tag } from '@douyinfe/semi-ui'
import { IconVolume2 } from '@douyinfe/semi-icons'

type PhoneticEntry = {
  label: string
  phonetic: string
  audioUrl: string
}

type Props = {
  entries: PhoneticEntry[]
}

export function PhoneticRow({ entries }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const play = (url: string) => {
    if (!url) return
    if (audioRef.current) {
      audioRef.current.pause()
    }
    const audio = new Audio(url)
    audioRef.current = audio
    audio.play().catch(() => {/* browser autoplay policy */})
  }

  const visible = entries.filter((e) => e.phonetic || e.audioUrl)
  if (visible.length === 0) return null

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      {visible.map((entry) => (
        <div key={entry.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Tag size="small" color="blue" shape="circle">{entry.label}</Tag>
          {entry.phonetic && (
            <span style={{ fontFamily: 'serif', color: 'var(--semi-color-text-1)', fontSize: 15 }}>
              {entry.phonetic}
            </span>
          )}
          {entry.audioUrl && (
            <Button
              size="small"
              theme="borderless"
              icon={<IconVolume2 />}
              onClick={() => play(entry.audioUrl)}
              aria-label={`Play ${entry.label} pronunciation`}
              style={{ color: 'var(--semi-color-primary)' }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
