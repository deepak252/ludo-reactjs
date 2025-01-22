import {
  JOIN_MATCH_API,
  MATCH_API,
  MATCH_HISTORY_API,
  ONGOING_MATCH_API,
} from '@/constants/apiUrls'
import { getRequest, postRequest } from '@/services/api'

export default class OnlineMatchService {
  static createMatch = async (data: { maxPlayersCount: number }) => {
    return await postRequest(MATCH_API, { data })
  }

  static joinMatch = async (data: { roomId: string }) => {
    return await postRequest(JOIN_MATCH_API, { data })
  }

  static getMatchHistory = async () => {
    return await getRequest(MATCH_HISTORY_API)
  }

  static getOngoingMatch = async () => {
    return await getRequest(ONGOING_MATCH_API)
  }
}
