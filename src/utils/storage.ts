import { User } from '@/features/user/user.types'

const ACCESS_TOKEN_KEY = 'access_token'
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

export const userSignedIn = () => {
  return !!getAccessToken()
}

export const removeUserFromStorage = () => {
  localStorage.removeItem(USER_KEY)
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}
