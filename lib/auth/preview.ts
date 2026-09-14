const PREVIEW_USER_KEY = 'kagoj.preview.user'

export type PreviewUser = { uid: string; email: string; displayName: string }

export function getPreviewUser(): PreviewUser | null {
  if (typeof window === 'undefined') return null
  try { return JSON.parse(window.localStorage.getItem(PREVIEW_USER_KEY) || 'null') as PreviewUser | null } catch { return null }
}

export function setPreviewUser(email: string): PreviewUser {
  const user = { uid: `preview-${email.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, email, displayName: email.split('@')[0] || 'Kagoj user' }
  window.localStorage.setItem(PREVIEW_USER_KEY, JSON.stringify(user))
  return user
}

export function clearPreviewUser() {
  window.localStorage.removeItem(PREVIEW_USER_KEY)
}
