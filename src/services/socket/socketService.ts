import { io, Socket } from 'socket.io-client'
import { SOCKET_BASE_URL } from '@/constants/environment'
import { getAccessToken } from '@/utils/storage'

export default class SocketService {
  static socket: Socket | null = null

  static getSocket = (): Socket => {
    if (!this.socket) {
      this.socket = io(SOCKET_BASE_URL, {
        extraHeaders: {
          Authorization: `Bearer ${getAccessToken()}`, // Add the Authorization header
        },
        autoConnect: false,
        reconnection: true,
        reconnectionDelay: 1000,
        // reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
      })

      this.socket.on('disconnect', () => {
        this.socket = null
        console.log('Disconnected')
      })
    }
    return this.socket
  }

  public static connect(): void {
    if (this.socket) {
      this.socket.connect()
    } else {
      console.error('Socket is not initialized.')
    }
  }

  static disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    } else {
      console.error('Socket is not initialized.')
    }
  }

  static refreshConnection() {
    this.disconnect()
    return this.connect()
  }
}
