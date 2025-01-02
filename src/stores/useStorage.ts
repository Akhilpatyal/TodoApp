import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

export default function useStorage<Value>(
  key: string,
  initialValue: Value
): Writable<Value> {
  let serialize = JSON.stringify
  let deserialize = JSON.parse

  let storedValue: Value
  const item = localStorage.getItem(key)
  if (item) {
    storedValue = deserialize(item)
  } else {
    storedValue = initialValue
  }

  let store = writable(storedValue)
  store.subscribe((value) => localStorage.setItem(key, serialize(value)))

  return store
}