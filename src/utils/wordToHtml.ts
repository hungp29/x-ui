import type { WordEntry, Dict } from '../services/wordApi'

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Converts a WordEntry JSON into a self-contained HTML string.
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

  return `<div class="word-entry">${sections.join('')}</div>`
}
