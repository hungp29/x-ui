import { useEffect, useState } from 'react'
import { fetchWord, WordNotFoundError } from '../services/wordApi'
import type { WordEntry, Dict } from '../services/wordApi'

export type WordLookupState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: WordEntry }
  | { status: 'not-found'; word: string }
  | { status: 'error'; message: string }

type CachedState = Extract<WordLookupState, { status: 'success' | 'not-found' | 'error' }>

// Module-level caches — survive tab switches and re-mounts for the session lifetime.
const resultCache = new Map<string, CachedState>()
const inflightCache = new Map<string, Promise<CachedState>>()

function cacheKey(word: string, dict: Dict) {
  return `${word.toLowerCase().trim()}::${dict}`
}

function resolveWord(word: string, dict: Dict): Promise<CachedState> {
  const key = cacheKey(word, dict)

  const cached = resultCache.get(key)
  if (cached) return Promise.resolve(cached)

  const inflight = inflightCache.get(key)
  if (inflight) return inflight

  const promise = fetchWord(word, dict)
    .then((data): CachedState => ({ status: 'success', data }))
    .catch((err: unknown): CachedState => {
      if (err instanceof WordNotFoundError) return { status: 'not-found', word }
      return { status: 'error', message: err instanceof Error ? err.message : 'Unknown error' }
    })
    .then((result) => {
      resultCache.set(key, result)
      inflightCache.delete(key)
      return result
    })

  inflightCache.set(key, promise)
  return promise
}

export function useWordLookup(word: string, dict: Dict): WordLookupState {
  const key = cacheKey(word, dict)

  const [state, setState] = useState<WordLookupState>(() => {
    if (!word.trim()) return { status: 'idle' }
    // Initialise from cache synchronously — no loading flash on tab switch
    return resultCache.get(key) ?? { status: 'loading' }
  })

  useEffect(() => {
    if (!word.trim()) {
      setState({ status: 'idle' })
      return
    }

    // Already resolved — sync state from cache without fetching
    const cached = resultCache.get(key)
    if (cached) {
      setState(cached)
      return
    }

    let cancelled = false
    setState({ status: 'loading' })

    resolveWord(word, dict).then((result) => {
      if (!cancelled) setState(result)
    })

    return () => {
      cancelled = true
    }
  }, [word, dict, key])

  return state
}
