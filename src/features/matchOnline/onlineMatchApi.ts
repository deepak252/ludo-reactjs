import { JOIN_MATCH_API, MATCH_API } from '@/constants/apiUrls'
import { postRequest } from '@/services/api'

export const createMatchApi = async (data: { maxPlayersCount: number }) => {
  return await postRequest(MATCH_API, { data })
}

export const joinMatchApi = async (data: { roomId: string }) => {
  return await postRequest(JOIN_MATCH_API, { data })
}
