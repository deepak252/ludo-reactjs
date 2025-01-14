import { SIGN_IN_API, SIGN_UP_API } from '@/constants/apiUrls'
import { postRequest } from '@/services/api'

export const signInApi = async (data: { email: string; password: string }) => {
  return await postRequest(SIGN_IN_API, { data })
}

export const signUpApi = async (data: {
  name: string
  email: string
  password: string
}) => {
  return await postRequest(SIGN_UP_API, { data })
}
