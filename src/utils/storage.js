export const STORAGE_KEYS = {
  SELECTED_DATE: 'SELECTED_DAY',
  TOKEN: 'TOKEN',
  LOGGER: 'LOGGER',
  THEME: 'THEME',
  LANGUAGE: 'LANGUAGE',
}

export const getStorageItem = (key, defaultValue = '', isString = true) => {
  try {
    return isString
      ? localStorage.getItem(key) ?? defaultValue
      : JSON.parse(localStorage.getItem(key)) ?? defaultValue
  } catch (_) {
    return defaultValue
  }
}

export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
  } catch (e) {
    console.error(e)
  }
}

export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    console.error(e)
  }
}
