import type { WordEntry } from '../services/wordApi'

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const STYLE = `
<style>
  .word-entry {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 15px;
    line-height: 1.6;
    color: #1c1c1e;
    max-width: 640px;
  }
  .word-header {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 8px;
  }
  .word-title {
    margin: 0;
    font-size: 28px;
    font-weight: 700;
  }
  .word-pos {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .pos {
    display: inline-block;
    padding: 1px 10px;
    border-radius: 20px;
    background: #ede9fe;
    color: #6d28d9;
    font-size: 12px;
    font-weight: 500;
  }
  .phonetics {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 12px;
  }
  .phonetic {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .phonetic-label {
    display: inline-block;
    padding: 1px 8px;
    border-radius: 20px;
    background: #dbeafe;
    color: #1d4ed8;
    font-size: 12px;
    font-weight: 500;
  }
  .phonetic-text {
    font-family: serif;
    font-size: 15px;
    color: #374151;
  }
  .meanings {
    margin-top: 12px;
    border-top: 1px solid #e5e7eb;
    padding-top: 12px;
  }
  .section-label {
    margin: 0 0 8px 0;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #9ca3af;
  }
  .meanings ol {
    padding-left: 20px;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .definition {
    margin: 0 0 6px 0;
  }
  .examples {
    padding-left: 16px;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .examples li em {
    font-style: italic;
    font-size: 13px;
    color: #6b7280;
  }
</style>
`.trim()

function buildMeaningsSection(label: string, entry: WordEntry): string {
  if (!entry.meanings.length) return ''
  const items = entry.meanings
    .map(m => {
      const exHtml =
        m.examples && m.examples.length > 0
          ? `<ul class="examples">${m.examples.map(ex => `<li><em>${esc(ex)}</em></li>`).join('')}</ul>`
          : ''
      return `<li><p class="definition">${esc(m.definition)}</p>${exHtml}</li>`
    })
    .join('')
  return `<div class="meanings"><p class="section-label">${esc(label)}</p><ol>${items}</ol></div>`
}

/**
 * Converts WordEntry JSON into a self-contained, styled HTML string.
 * Always includes full English content. When enViEntry is provided,
 * appends Vietnamese meanings (definitions + examples only).
 */
export function wordToHtml(enEntry: WordEntry, enViEntry?: WordEntry | null): string {
  const sections: string[] = []

  // ── Header: word + part-of-speech ──────────────────────────────────────────
  const posHtml = enEntry.part_of_speech.length
    ? `<div class="word-pos">${enEntry.part_of_speech.map(p => `<span class="pos">${esc(p)}</span>`).join(' ')}</div>`
    : ''
  sections.push(`<div class="word-header"><h2 class="word-title">${esc(enEntry.text)}</h2>${posHtml}</div>`)

  // ── Phonetics (UK / US) ─────────────────────────────────────────────────────
  const phoneticEntries = [
    { label: 'UK', value: enEntry.phonetic_uk },
    { label: 'US', value: enEntry.phonetic_us },
  ].filter(e => e.value)

  if (phoneticEntries.length > 0) {
    const phoneticsHtml = phoneticEntries
      .map(e => `<span class="phonetic"><span class="phonetic-label">${esc(e.label)}</span> <span class="phonetic-text">${esc(e.value)}</span></span>`)
      .join(' ')
    sections.push(`<div class="phonetics">${phoneticsHtml}</div>`)
  }

  // ── English definitions ─────────────────────────────────────────────────────
  sections.push(buildMeaningsSection('English Definitions', enEntry))

  // ── Vietnamese meanings (definitions + examples only) ───────────────────────
  if (enViEntry) {
    sections.push(buildMeaningsSection('Vietnamese Translation', enViEntry))
  }

  return `${STYLE}\n<div class="word-entry">${sections.join('')}</div>`
}
