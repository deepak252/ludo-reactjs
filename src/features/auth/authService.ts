import {
  SIGN_IN_API,
  SIGN_OUT_API,
  SIGN_UP_API,
  USERNAME_CHECK_API,
} from '@/constants/apiUrls'
import { postRequest } from '@/services/api'

export default class AuthService {
  static signIn = async (data: {
    usernameOrEmail: string
    password: string
  }) => {
    return await postRequest(SIGN_IN_API, { data })
  }

  static signUp = async (data: {
    username: string
    email: string
    password: string
  }) => {
    return await postRequest(SIGN_UP_API, { data })
  }

  static signOut = async () => {
    return await postRequest(SIGN_OUT_API)
  }

  static checkUsername = async (data: { username: string }) => {
    return await postRequest(USERNAME_CHECK_API, { data })
  }
}
