import { USER_PROFILE_API } from '@/constants/apiUrls'
import { getRequest } from '@/services/api'

export const getUserProfileApi = async () => {
  return await getRequest(USER_PROFILE_API)
}
