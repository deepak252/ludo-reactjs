import {
  // JOIN_MATCH_API,
  // MATCH_API,
  MATCH_HISTORY_API,
  ONGOING_MATCH_API,
} from '@/constants/apiUrls'
import { getRequest } from '@/services/api'
import { Socket } from 'socket.io-client'
import { MatchOnline } from './onlineMatch.types'
import { emitAsync } from '@/services/socket/util'

export default class OnlineMatchService {
  static createMatch = async (
    socket: Socket,
    data: { maxPlayersCount: number }
  ) => {
    return emitAsync<MatchOnline | undefined>(socket, 'createMatch', data)
  }

  static joinMatch = async (socket: Socket, data: { roomId: string }) => {
    return emitAsync<MatchOnline | undefined>(socket, 'joinMatch', data)
  }

  static getMatchHistory = async () => {
    return await getRequest(MATCH_HISTORY_API)
  }

  static getOngoingMatch = async () => {
    return await getRequest(ONGOING_MATCH_API)
  }
}
