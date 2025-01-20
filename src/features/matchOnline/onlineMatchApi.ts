import { MATCH_API } from '@/constants/apiUrls'
import { postRequest } from '@/services/api'

export const createRoomApi = async (data: { maxPlayersCount: number }) => {
  return await postRequest(MATCH_API, { data })
}
