import { ApiResponse } from '@/utils/ApiResponse'
import { Socket } from 'socket.io-client'

export const emitAsync = <R = any, P = any>(
  socket: Socket,
  event: string,
  data: P
): Promise<R> => {
  return new Promise((resolve, reject) => {
    socket.emit(event, data, (response: ApiResponse<R>) => {
      if (response && response.code >= 200 && response.code < 300) {
        resolve(response.data as R)
      } else {
        reject(new Error(response.message))
      }
    })
  })
}
