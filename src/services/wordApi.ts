export type Dict = 'english' | 'english-vietnamese'

export type Meaning = {
  definition: string
  examples: string[] | null
}

export type WordEntry = {
  text: string
  /** General phonetic (used by english-vietnamese dict) */
  phonetic: string
  phonetic_uk: string
  phonetic_us: string
  audio_uk: string
  audio_us: string
  part_of_speech: string[]
  meanings: Meaning[]
}

const BASE_URL = import.meta.env.VITE_WORD_API_BASE_URL

export class WordNotFoundError extends Error {
  constructor(word: string) {
    super(`"${word}" not found`)
    this.name = 'WordNotFoundError'
  }
}

export async function fetchWord(word: string, dict: Dict): Promise<WordEntry> {
  const url = `${BASE_URL}/${encodeURIComponent(word.trim())}?dict=${dict}`
  const res = await fetch(url)

  if (res.status === 404) throw new WordNotFoundError(word)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)

  const raw = await res.json()

  if (!raw.text) throw new WordNotFoundError(word)

  // Normalize nullable arrays the API may return for uncommon words
  return {
    ...raw,
    part_of_speech: raw.part_of_speech ?? [],
    meanings: (raw.meanings ?? []).map((m: Meaning) => ({
      ...m,
      examples: m.examples ?? [],
    })),
  } satisfies WordEntry
}
