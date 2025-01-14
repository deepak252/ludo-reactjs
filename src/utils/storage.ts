// const ACCESS_TOKEN_KEY = 'access_token'
const USER_KEY = 'access_token'

// export const saveAccessToken = (token?: string) => {
//   if (!token) return
//   localStorage.setItem(ACCESS_TOKEN_KEY, token)
// }
// export const getAccessToken = () => {
//   return localStorage.getItem(ACCESS_TOKEN_KEY)
// }

export const saveUserToStorage = (data: Record<string, any>) => {
  if (!data) return
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(data))
  } catch (e) {
    console.log(e)
  }
}
export const getUserFromStorage = () => {
  const data = localStorage.getItem(USER_KEY)
  try {
    if (data) {
      return JSON.parse(data)
    }
  } catch (e) {
    console.log(e)
  }
}

export const userSignedIn = () => {
  return !!getUserFromStorage()
}
