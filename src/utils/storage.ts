import { MatchOffline } from '@/features/matchOffline/offlineMatch.types'
import { User } from '@/features/user/user.types'

const ACCESS_TOKEN_KEY = 'access_token'
const OFFLINE_MATCH_KEY = 'match_offline'
const USER_KEY = 'user'

export const saveAccessToken = (token?: string) => {
  if (!token) return
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export const saveUserToStorage = (data: Record<string, any>) => {
  if (!data) return
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('saveUserToStorage', e)
  }
}

export const getUserFromStorage = (): User | undefined => {
  const data = localStorage.getItem(USER_KEY)
  try {
    if (data) {
      return JSON.parse(data)
    }
  } catch (e) {
    console.error('getUserFromStorage', e)
  }
}

export const saveOfflineMatch = (data: MatchOffline) => {
  if (!data) return
  try {
    localStorage.setItem(OFFLINE_MATCH_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('saveOfflineMatch', e)
  }
}

export const getOfflineMatch = (): MatchOffline | undefined => {
  const data = localStorage.getItem(OFFLINE_MATCH_KEY)
  try {
    if (data) {
      return JSON.parse(data)
    }
  } catch (e) {
    console.error('getOfflineMatch', e)
  }
}

export const removeOfflineMatch = () => {
  localStorage.removeItem(OFFLINE_MATCH_KEY)
}

export const userSignedIn = () => {
  return !!getAccessToken()
}

export const removeUserFromStorage = () => {
  localStorage.removeItem(USER_KEY)
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}
