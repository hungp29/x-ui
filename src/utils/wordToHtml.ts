import type { WordEntry, Dict } from '../services/wordApi'

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

/**
 * Converts a WordEntry JSON into a self-contained, styled HTML string.
 * Suitable for pasting into Anki cards or any HTML-capable environment.
 */
export function wordToHtml(entry: WordEntry, dict: Dict): string {
  const isEnVi = dict === 'english-vietnamese'
  const sections: string[] = []

  // ── Header: word + part-of-speech ──────────────────────────────────────────
  const posHtml = entry.part_of_speech.length
    ? `<div class="word-pos">${entry.part_of_speech.map(p => `<span class="pos">${esc(p)}</span>`).join(' ')}</div>`
    : ''
  sections.push(`<div class="word-header"><h2 class="word-title">${esc(entry.text)}</h2>${posHtml}</div>`)

  // ── Phonetics ───────────────────────────────────────────────────────────────
  const phoneticEntries = isEnVi
    ? [{ label: 'Phonetic', value: entry.phonetic }]
    : [
        { label: 'UK', value: entry.phonetic_uk },
        { label: 'US', value: entry.phonetic_us },
      ]

  const visiblePhonetics = phoneticEntries.filter(e => e.value)
  if (visiblePhonetics.length > 0) {
    const phoneticsHtml = visiblePhonetics
      .map(e => `<span class="phonetic"><span class="phonetic-label">${esc(e.label)}</span> <span class="phonetic-text">${esc(e.value)}</span></span>`)
      .join(' ')
    sections.push(`<div class="phonetics">${phoneticsHtml}</div>`)
  }

  // ── Meanings ────────────────────────────────────────────────────────────────
  if (entry.meanings.length > 0) {
    const sectionLabel = isEnVi ? 'Vietnamese Translation' : 'English Definitions'
    const meaningsHtml = entry.meanings
      .map(m => {
        const exHtml =
          m.examples && m.examples.length > 0
            ? `<ul class="examples">${m.examples.map(ex => `<li><em>${esc(ex)}</em></li>`).join('')}</ul>`
            : ''
        return `<li><p class="definition">${esc(m.definition)}</p>${exHtml}</li>`
      })
      .join('')
    sections.push(
      `<div class="meanings"><p class="section-label">${esc(sectionLabel)}</p><ol>${meaningsHtml}</ol></div>`,
    )
  }

  return `${STYLE}\n<div class="word-entry">${sections.join('')}</div>`
}
