import type { StorageKV } from './constant/store.key'

export function setToStorage<K extends keyof StorageKV>(key: K, value: StorageKV[K]) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getFromStorage<K extends keyof StorageKV>(key: K): StorageKV[K] | null {
  const value = localStorage.getItem(key)
  if (!value) return null
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}
